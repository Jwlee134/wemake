import { data, Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/login-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircleIcon } from "lucide-react";
import { z } from "zod";
import { getServerClient } from "~/supa-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | wemake" },
    { name: "description", content: "Login to your account" },
  ];
}

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be a string",
    })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be a string",
    })
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const {
    success,
    data: loginData,
    error,
  } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { formErrors: error.flatten().fieldErrors, loginError: null };
  }

  const { email, password } = loginData;

  const { client, headers } = getServerClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return { formErrors: null, loginError: loginError.message };
  }

  return redirect("/", { headers });
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-4 top-4">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputWithLabel
            id="email"
            label="Email"
            name="email"
            type="email"
            description="Enter your email"
            placeholder="e.g. john_doe@example.com"
            required
          />
          {actionData?.formErrors?.email && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.formErrors.email.join(", ")}
            </p>
          )}
          <InputWithLabel
            id="password"
            label="Password"
            name="password"
            type="password"
            description="Enter your password"
            placeholder="Enter your password"
            required
          />
          {actionData?.formErrors?.password && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.formErrors.password.join(", ")}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          {actionData?.loginError && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.loginError}
            </p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
