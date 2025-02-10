import { Form, Link } from "react-router";
import type { Route } from "./+types/login-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | wemake" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function LoginPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-4 top-4">
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <Form className="w-full space-y-4">
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
