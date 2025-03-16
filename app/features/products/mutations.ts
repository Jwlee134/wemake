import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

export async function createProductReview(
  client: SupabaseClient<Database>,
  {
    productId,
    userId,
    review,
    rating,
  }: { productId: number; userId: string; review: string; rating: number }
) {
  const { data, error } = await client
    .from("product_reviews")
    .insert({ product_id: productId, profile_id: userId, review, rating });

  if (error) throw new Error(error.message);
}

export async function createProduct(
  client: SupabaseClient<Database>,
  data: {
    userId: string;
    name: string;
    tagline: string;
    icon: string;
    description: string;
    category: number;
    url: string;
    howItWorks: string;
  }
) {
  const { data: product, error } = await client
    .from("products")
    .insert({
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      category_id: data.category,
      profile_id: data.userId,
      icon: data.icon,
      url: data.url,
      how_it_works: data.howItWorks,
    })
    .select("product_id")
    .single();

  if (error) throw new Error(error.message);

  return product;
}
