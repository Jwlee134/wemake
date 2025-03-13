import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/join-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { checkUsernameExists } from "../queries";
import { getServerClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join | wemake" },
    { name: "description", content: "Create a new account" },
  ];
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }

  const usernameExists = await checkUsernameExists(request, data.username);

  if (usernameExists) {
    return { formErrors: { username: ["Username already exists"] } };
  }

  const { client, headers } = getServerClient(request);

  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });

  if (signUpError) {
    return { signUpError: signUpError.message };
  }

  return redirect("/", { headers });
}

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-4 top-4">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <h1 className="text-2xl font-bold">Join</h1>
        <Form className="w-full space-y-4" method="post">
          <InputWithLabel
            id="name"
            label="Name"
            name="name"
            type="text"
            description="Enter your name"
            placeholder="e.g. John Doe"
            required
          />
          {actionData?.formErrors?.name && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.formErrors.name[0]}
            </p>
          )}
          <InputWithLabel
            id="username"
            label="Username"
            name="username"
            type="text"
            description="Enter your username"
            placeholder="e.g. john_doe"
            required
          />
          {actionData?.formErrors?.username && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.formErrors.username[0]}
            </p>
          )}
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
              {actionData.formErrors.email[0]}
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
              {actionData.formErrors.password[0]}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Join"
            )}
          </Button>
          {actionData?.signUpError && (
            <p className="text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
