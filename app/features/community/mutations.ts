import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export async function createPost(
  client: SupabaseClient<Database>,
  {
    title,
    topic,
    content,
    userId,
  }: { title: string; topic: string; content: string; userId: string }
) {
  const { data: topicData, error: topicError } = await client
    .from("post_topics")
    .select("topic_id")
    .eq("slug", topic)
    .single();

  if (topicError) throw topicError;

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: topicData.topic_id,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function createReply(
  client: SupabaseClient<Database>,
  {
    postId,
    content,
    userId,
    parentId,
  }: { postId: string; content: string; userId: string; parentId?: number }
) {
  const { error } = await client.from("post_replies").insert({
    ...(!parentId
      ? { post_id: parseInt(postId) }
      : { parent_reply_id: parentId }),
    content,
    profile_id: userId,
  });

  if (error) throw error;
}
