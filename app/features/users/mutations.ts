import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export async function updateUser(
  client: SupabaseClient<Database>,
  userId: string,
  data: {
    name: string;
    role: string;
    bio: string;
    headline: string;
  }
) {
  const { error } = await client
    .from("profiles")
    .update({
      name: data.name,
      role: data.role as
        | "developer"
        | "designer"
        | "marketer"
        | "founder"
        | "product-manager",
      bio: data.bio,
      headline: data.headline,
    })
    .eq("profile_id", userId);

  if (error) throw new Error(error.message);
}
