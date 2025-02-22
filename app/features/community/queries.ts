import db from "~/db";
import { posts, postTopics, postUpvotes } from "./schema";
import { count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";
import client from "~/supa-client";

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

export async function getPostTopics() {
  const { data, error } = await client.from("post_topics").select("name, slug");

  if (error) throw new Error(error.message);

  return data;
}

export async function getPosts() {
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

  const { data, error } = await client
    .from("community_post_list_view")
    .select("*");

  if (error) throw new Error(error.message);

  return data;
}
