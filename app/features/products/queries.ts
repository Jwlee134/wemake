import type { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./constants";

export async function getProductsByDateRange({
  startDate,
  endDate,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  page?: number;
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
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;

  return data;
}

export async function getProductPagesByDateRange({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) {
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
