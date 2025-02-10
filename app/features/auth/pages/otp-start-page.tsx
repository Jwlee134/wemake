import { Form, Link } from "react-router";
import type { Route } from "./+types/otp-start-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enter OTP | wemake" },
    { name: "description", content: "Enter your one-time password" },
  ];
}

export default function OtpStartPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 4 digit code to log in to your account
          </p>
        </div>
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
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
