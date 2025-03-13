import { getServerClient } from "~/supa-client";

export async function checkUsernameExists(request: Request, username: string) {
  const { client } = getServerClient(request);

  const { error } = await client
    .from("profiles")
    .select("profile_id")
    .eq("username", username)
    .single();

  if (error) {
    return false;
  }

  return true;
}
