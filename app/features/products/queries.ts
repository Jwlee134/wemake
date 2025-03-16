import type { DateTime } from "luxon";
import { PAGE_SIZE } from "./constants";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export async function getProductsByDateRange(
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
    page = 1,
  }: {
    startDate: DateTime;
    endDate: DateTime;
    page?: number;
  }
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
        created_at
    `
    )
    .order("stats->>upvotes", { ascending: false })
    .lte("created_at", endDate.toISO())
    .gte("created_at", startDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;

  return data;
}

export async function getProductPagesByDateRange(
  client: SupabaseClient<Database>,
  {
    startDate,
    endDate,
  }: {
    startDate: DateTime;
    endDate: DateTime;
  }
) {
  const { count, error } = await client
    .from("products")
    // head true means I don't want to get the data whatsoever, I just want to get the count.
    .select("product_id", { count: "exact", head: true })
    .lte("created_at", endDate.toISO())
    .gte("created_at", startDate.toISO());

  if (error) throw error;

  if (!count) return 0;

  return Math.ceil(count / PAGE_SIZE);
}

export async function getProductCategories(client: SupabaseClient<Database>) {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description");

  if (error) throw error;

  return data;
}

export async function getProductCategory(
  client: SupabaseClient<Database>,
  categoryId: string
) {
  const { data, error } = await client
    .from("categories")
    .select("category_id, name, description")
    .eq("category_id", categoryId)
    .single();

  if (error) throw error;

  return data;
}

export async function getProductsByCategory(
  client: SupabaseClient<Database>,
  {
    categoryId,
    page = 1,
  }: {
    categoryId: number;
    page?: number;
  }
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
        created_at
    `
    )
    .eq("category_id", categoryId)
    .order("stats->>upvotes", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;

  return data;
}

export async function getCategoryPages(
  client: SupabaseClient<Database>,
  { categoryId }: { categoryId: number }
) {
  const { count, error } = await client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (error) throw error;

  if (!count) return 1;

  return Math.ceil(count / PAGE_SIZE);
}

export async function getProductsBySearch(
  client: SupabaseClient<Database>,
  {
    query,
    page = 1,
  }: {
    query: string;
    page?: number;
  }
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
        created_at
    `
    )
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .order("stats->>upvotes", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;

  return data;
}

export async function getPagesBySearch(
  client: SupabaseClient<Database>,
  { query }: { query: string }
) {
  const { count, error } = await client
    .from("products")
    .select("product_id", { count: "exact", head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

  if (error) throw error;

  if (!count) return 1;

  return Math.ceil(count / PAGE_SIZE);
}

export async function getProductById(
  client: SupabaseClient<Database>,
  productId: string
) {
  const { data, error } = await client
    .from("product_overview_view")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (error) throw error;

  return data;
}

export async function getProductReviews(
  client: SupabaseClient<Database>,
  productId: string
) {
  const { data, error } = await client
    .from("product_reviews")
    .select(
      `
      review_id,
      rating,
      review,
      created_at,
      user:profiles!inner(
        profile_id,
        name,
        username,
        avatar
      )
    `
    )
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
