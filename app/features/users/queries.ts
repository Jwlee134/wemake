import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";
import type { Database } from "~/supa-client";

export async function getUserById(
  client: SupabaseClient<Database>,
  userId: string
) {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar
    `
    )
    .eq("profile_id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function getUserProfile(
  client: SupabaseClient<Database>,
  username: string
) {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio,
        stats->>followers,
        stats->>following
    `
    )
    .eq("username", username)
    .single();

  if (error) throw error;

  return data;
}

export async function getUserProducts(
  client: SupabaseClient<Database>,
  username: string
) {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        tagline,
        stats->>upvotes,
        stats->>views,
        stats->>reviews,
        created_at,
        profiles!products_profile_id_profiles_profile_id_fk!inner (
            profile_id
        )
        `
    )
    .eq("profiles.username", username);

  if (error) throw error;

  return data;
}

export async function getUserPosts(
  client: SupabaseClient<Database>,
  username: string
) {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);

  if (error) throw error;

  return data;
}

export async function getLoggedInUserId(client: SupabaseClient<Database>) {
  const { data, error } = await client.auth.getUser();

  if (error || data.user === null) {
    throw redirect("/auth/login");
  }

  return data.user.id;
}
