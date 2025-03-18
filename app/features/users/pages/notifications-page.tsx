import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId, getNotifications } from "../queries";
import { DateTime } from "luxon";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Notifications | wemake" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications = await getNotifications(client, userId);

  return { notifications };
}

export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  const { notifications } = loaderData;

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            id={notification.notification_id}
            avatarUrl={notification.sender?.avatar ?? ""}
            username={notification.sender?.username ?? ""}
            type={notification.type}
            timestamp={DateTime.fromISO(notification.created_at).toRelative()!}
            seen={notification.seen}
            productName={notification.product?.name ?? ""}
            postTitle={notification.post?.title ?? ""}
            payloadId={
              notification.product?.product_id ??
              notification.post?.post_id ??
              null
            }
          />
        ))}
      </div>
    </div>
  );
}
