import client from "~/supa-client";

export async function getUserProfile(username: string) {
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

export async function getUserProducts(username: string) {
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

export async function getUserPosts(username: string) {
  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("username", username);

  if (error) throw error;

  return data;
}
