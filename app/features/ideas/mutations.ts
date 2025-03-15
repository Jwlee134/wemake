import type { Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function claimIdea({
  client,
  ideaId,
  userId,
}: {
  client: SupabaseClient<Database>;
  ideaId: string;
  userId: string;
}) {
  const { error } = await client
    .from("gpt_ideas")
    .update({
      claimed_at: new Date().toISOString(),
      claimed_by: userId,
    })
    .eq("idea_id", ideaId);

  if (error) throw error;
}
