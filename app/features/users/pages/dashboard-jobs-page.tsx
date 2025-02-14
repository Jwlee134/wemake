import type { Route } from "./+types/dashboard-jobs-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Jobs" }];
}

export default function DashboardJobsPage() {
  return <div>Dashboard Jobs Page</div>;
}
