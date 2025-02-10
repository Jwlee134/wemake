import type { Route } from "./+types/otp-start-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enter OTP" },
    { name: "description", content: "Enter your one-time password" },
  ];
}

export default function OtpStartPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enter OTP</h1>
      {/* OTP input form will go here */}
    </div>
  );
}
