import type { Route } from "./+types/social-complete-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Complete Social Login" },
    { name: "description", content: "Complete your social login" },
  ];
}

export default function SocialCompletePage({}: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Complete Social Login</h1>
      {/* Social login completion UI will go here */}
    </div>
  );
}
