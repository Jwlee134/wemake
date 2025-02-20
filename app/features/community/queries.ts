import db from "~/db";
import { posts, postTopics, postUpvotes } from "./schema";
import { count, eq } from "drizzle-orm";
import { profiles } from "../users/schema";

export async function getPostTopics() {
  const allPostTopics = await db
    .select({
      name: postTopics.name,
      slug: postTopics.slug,
    })
    .from(postTopics);

  return allPostTopics;
}

export async function getPosts() {
  const allPosts = await db
    .select({
      id: posts.post_id,
      title: posts.title,
      createdAt: posts.created_at,
      topic: postTopics.name,
      authorName: profiles.name,
      authorAvatarUrl: profiles.avatar,
      authorUsername: profiles.username,
      upvotes: count(postUpvotes.post_id),
    })
    .from(posts)
    .innerJoin(postTopics, eq(posts.post_id, postTopics.topic_id))
    .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
    .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
    .groupBy(
      posts.post_id,
      profiles.name,
      profiles.avatar,
      profiles.username,
      postTopics.name
    );

  return allPosts;
}
