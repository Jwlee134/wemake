import { Outlet } from "react-router";
import type { Route } from "./+types/auth-layout";

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-gradient-to-br from-primary via-black to-primary/50"></div>
      <Outlet />
    </div>
  );
}
