import type { SupabaseClient } from "@supabase/supabase-js";
import type { TeamSubmitFormData } from "./pages/team-submit-page";
import type { Database } from "~/supa-client";

export async function createTeam({
  client,
  userId,
  formData,
}: {
  client: SupabaseClient<Database>;
  userId: string;
  formData: TeamSubmitFormData;
}) {
  const { data, error } = await client
    .from("teams")
    .insert({
      product_name: formData.name,
      team_size: formData.size,
      equity_split: formData.equity,
      roles: formData.roles,
      product_description: formData.description,
      product_stage: formData.stage as
        | "idea"
        | "prototype"
        | "mvp"
        | "launched",
      team_leader_id: userId,
    })
    .select("team_id")
    .single();

  if (error) throw error;

  return data;
}
