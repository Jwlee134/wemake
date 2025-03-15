import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export async function getGptIdeas(
  client: SupabaseClient<Database>,
  { limit }: { limit: number }
) {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);

  if (error) throw new Error(error.message);

  return data;
}

export async function getGptIdea(
  client: SupabaseClient<Database>,
  { id }: { id: string }
) {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("idea_id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getClaimedIdeas(
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) {
  const { data, error } = await client
    .from("gpt_ideas")
    .select("idea_id, idea, claimed_at")
    .eq("claimed_by", userId);

  if (error) throw new Error(error.message);

  return data;
}
