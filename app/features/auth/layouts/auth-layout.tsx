import { Outlet } from "react-router";
import type { Route } from "./+types/auth-layout";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div>
        <FlickeringGrid gridGap={5} color="hsl(var(--primary))" />
      </div>
      <Outlet />
    </div>
  );
}
