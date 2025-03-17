import { getServerClient } from "~/supa-client";
import type { Route } from "./+types/post-upvote-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { toggleUpvote } from "../mutations";

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);
  const { postId } = params;

  await toggleUpvote(client, { postId, userId });

  return { success: true };
}
