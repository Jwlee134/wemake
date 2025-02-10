import type { Route } from "./+types/otp-complete-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify OTP" },
    { name: "description", content: "Verify your one-time password" },
  ];
}

export default function OtpCompletePage({}: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verify OTP</h1>
      {/* OTP verification form will go here */}
    </div>
  );
}
