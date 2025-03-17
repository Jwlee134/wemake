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

export async function toggleUpvote(
  client: SupabaseClient<Database>,
  { postId, userId }: { postId: string; userId: string }
) {
  const { count } = await client
    .from("post_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("profile_id", userId);

  if (count === 0) {
    await client.from("post_upvotes").insert({
      post_id: parseInt(postId),
      profile_id: userId,
    });
  } else {
    await client
      .from("post_upvotes")
      .delete()
      .eq("post_id", parseInt(postId))
      .eq("profile_id", userId);
  }
}
