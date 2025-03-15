import { redirect } from "react-router";
import type { Route } from "./+types/profile-page";
import { getServerClient } from "~/supa-client";
import { getUserById } from "../queries";

export async function loader({ request }: Route.LoaderArgs) {
  // find user by cookie
  const { client } = getServerClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const profile = await getUserById(client, user.id);

  return redirect(`/users/${profile.username}`);
}
