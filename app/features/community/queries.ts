import db from "~/db";
import { posts, postTopics, postUpvotes } from "./schema";
import { count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";
import { DateTime } from "luxon";
import type { Database } from "~/supa-client";
import type { SupabaseClient } from "@supabase/supabase-js";

// export async function getPostTopics() {
//   const allPostTopics = await db
//     .select({
//       name: postTopics.name,
//       slug: postTopics.slug,
//     })
//     .from(postTopics);

//   return allPostTopics;
// }

// export async function getPosts() {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       topic: postTopics.name,
//       authorName: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       authorUsername: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(postTopics, eq(posts.post_id, postTopics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(
//       posts.post_id,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//       postTopics.name
//     );

//   return allPosts;
// }

export async function getPostTopics(client: SupabaseClient<Database>) {
  const { data, error } = await client.from("post_topics").select("name, slug");

  if (error) throw new Error(error.message);

  return data;
}

export async function getPosts(
  client: SupabaseClient<Database>,
  {
    limit,
    sorting = "newest",
    period = "all",
    keyword,
    topic,
  }: {
    limit: number;
    sorting?: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    keyword?: string;
    topic?: string;
  }
) {
  // posts_profile_id_profiles_profile_id_fk is used because posts is connected to profiles through profile_id,
  // and also is connected to profiles through post_upvotes.profile_id.

  // supabase is throwing an error because of this, to make you choose between the two.
  // if you look at the error details, you can find the key.
  // const { data, error } = await client.from("posts").select(`
  //   post_id,
  //   title,
  //   created_at,
  //   topic:post_topics!inner (
  //     name
  //   ),
  //   author:profiles!posts_profile_id_profiles_profile_id_fk!inner (
  //     name,
  //     avatar,
  //     username
  //   ),
  //   upvotes:post_upvotes (
  //     count
  //   )
  // `);

  const baseQuery = client
    .from("community_post_list_view")
    .select("*")
    .limit(limit);

  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else {
    switch (period) {
      case "all":
        baseQuery.order("upvotes", { ascending: false });
        break;
      case "today":
        const today = DateTime.now().startOf("day");
        baseQuery
          .order("upvotes", { ascending: false })
          .gte("created_at", today.toISO());
        break;
      case "week":
        const week = DateTime.now().startOf("week");
        baseQuery
          .order("upvotes", { ascending: false })
          .gte("created_at", week.toISO());
        break;
      case "month":
        const month = DateTime.now().startOf("month");
        baseQuery
          .order("upvotes", { ascending: false })
          .gte("created_at", month.toISO());
        break;
      case "year":
        const year = DateTime.now().startOf("year");
        baseQuery
          .order("upvotes", { ascending: false })
          .gte("created_at", year.toISO());
        break;
    }
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;

  if (error) throw new Error(error.message);

  return data;
}

export async function getPostById(
  client: SupabaseClient<Database>,
  postId: number
) {
  const { data, error } = await client
    .from("community_post_detail_view")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getPostReplies(
  client: SupabaseClient<Database>,
  postId: number
) {
  const replyQuery = `
    reply_id,
    content,
    created_at,
    author:profiles!inner(
      profile_id,
      name,
      avatar,
      username
    )
  `;

  const { data, error } = await client
    .from("post_replies")
    .select(
      `
        ${replyQuery},
        replies:post_replies!parent_reply_id(
          ${replyQuery}
        )
      `
    )
    .eq("post_id", postId)
    .is("parent_reply_id", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
