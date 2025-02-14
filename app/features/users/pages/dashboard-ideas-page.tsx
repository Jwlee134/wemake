import type { Route } from "./+types/dashboard-ideas-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Ideas" }];
}

export default function DashboardIdeasPage() {
  return <div>Dashboard Ideas Page</div>;
}
