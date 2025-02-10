import type { Route } from "./+types/social-start-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Social Login" },
    { name: "description", content: "Login with your social account" },
  ];
}

export default function SocialStartPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Social Login</h1>
      {/* Social login initialization UI will go here */}
    </div>
  );
}
