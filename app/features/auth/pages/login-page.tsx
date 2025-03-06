import { data, Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/login-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | wemake" },
    { name: "description", content: "Login to your account" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  return data({ message: "gagaga" });
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
          <InputWithLabel
            id="password"
            label="Password"
            name="password"
            type="password"
            description="Enter your password"
            placeholder="Enter your password"
            required
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
