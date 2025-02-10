import InputWithLabel from "~/common/components/input-with-label";
import type { Route } from "./+types/otp-complete-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify OTP | wemake" },
    { name: "description", content: "Verify your one-time password" },
  ];
}

export default function OtpCompletePage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 4 digit code we sent you
          </p>
        </div>
        <Form className="w-full space-y-4">
          <InputWithLabel
            id="otp"
            label="OTP"
            name="otp"
            type="number"
            description="Enter the 4 digit code we sent you"
            placeholder="e.g. 1234"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
