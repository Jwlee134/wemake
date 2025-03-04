import type { DateTime } from "luxon";
import client from "~/supa-client";

export async function getProductsByDateRange({
  startDate,
  endDate,
  limit = 10,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit?: number;
}) {
  const { data, error } = await client
    .from("products")
    .select(
      `
        product_id,
        name,
        description,
        stats->>upvotes,
        stats->>views,
        stats->>reviews,
        created_at
    `
    )
    .order("stats->>upvotes", { ascending: false })
    .lte("created_at", endDate.toISO())
    .gte("created_at", startDate.toISO())
    .limit(limit);

  if (error) throw error;

  return data;
}
