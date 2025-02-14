import type { Route } from "./+types/dashboard-teams-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Teams" }];
}

export default function DashboardTeamsPage() {
  return <div>Dashboard Teams Page</div>;
}
