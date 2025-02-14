import type { Route } from "./+types/dashboard-product-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Product" }];
}

export default function DashboardProductPage() {
  return <div>Dashboard Product Page</div>;
}
