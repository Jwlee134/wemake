import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Notifications | wemake" }];
}

export default function NotificationsPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarUrl="https://github.com/shadcn.png"
          username="John Doe"
          message="has joined your team."
          timestamp="2 hours ago"
          seen={false}
          onMarkAsRead={() => {
            // Handle mark as read
          }}
        />
      </div>
    </div>
  );
}
