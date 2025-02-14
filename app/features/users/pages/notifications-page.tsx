import type { Route } from "./+types/notifications-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Notifications" }];
}

export default function NotificationsPage() {
  return <div>Notifications Page</div>;
}
