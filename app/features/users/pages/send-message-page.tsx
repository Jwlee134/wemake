import { getServerClient } from "~/supa-client";
import type { Route } from "./+types/send-message-page";
import { getLoggedInUserId, getUserProfile } from "../queries";
import { sendMessage } from "../mutations";
import { redirect } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const formData = await request.formData();
  const message = formData.get("message") as string;

  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);
  const { profile_id: receiverId } = await getUserProfile(
    client,
    params.username
  );

  const messageRoomId = await sendMessage(client, {
    senderId: userId,
    receiverId,
    message,
  });

  return redirect(`/my/messages/${messageRoomId}`);
}
