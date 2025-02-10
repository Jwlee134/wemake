import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function JoinPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button variant={"ghost"} asChild className="absolute right-4 top-4">
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <h1 className="text-2xl font-bold">Join</h1>
        <Form className="w-full space-y-4">
          <InputWithLabel
            id="name"
            label="Name"
            name="name"
            type="text"
            description="Enter your name"
            placeholder="e.g. John Doe"
            required
          />
          <InputWithLabel
            id="username"
            label="Username"
            name="username"
            type="text"
            description="Enter your username"
            placeholder="e.g. john_doe"
            required
          />
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
            Join
          </Button>
        </Form>
      </div>
    </div>
  );
}
