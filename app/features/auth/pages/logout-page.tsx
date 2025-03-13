import { redirect } from "react-router";
import { getServerClient } from "~/supa-client";
import type { Route } from "./+types/logout-page";

export async function loader({ request }: Route.LoaderArgs) {
  const { client, headers } = getServerClient(request);
  await client.auth.signOut();

  return redirect("/", { headers });
}
