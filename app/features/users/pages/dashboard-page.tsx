import type { Route } from "./+types/dashboard-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard" }];
}

export default function DashboardPage() {
  return <div>Dashboard Page</div>;
}
