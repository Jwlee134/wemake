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
