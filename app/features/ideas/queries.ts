import client from "~/supa-client";

export async function getGptIdeas({ limit }: { limit: number }) {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);

  if (error) throw new Error(error.message);

  return data;
}

export async function getGptIdea({ id }: { id: string }) {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("idea_id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
