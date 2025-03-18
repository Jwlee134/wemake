import { getServerClient } from "~/supa-client";
import type { Route } from "./+types/notification-read-page";
import { getLoggedInUserId } from "../queries";
import { markNotificationAsRead } from "../mutations";

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  await markNotificationAsRead(client, {
    notificationId: params.notificationId,
    userId,
  });

  return { success: true };
}
