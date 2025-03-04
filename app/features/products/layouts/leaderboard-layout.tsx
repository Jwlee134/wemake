import { data, Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success: searchParamsSuccess, data: parsedSearchParams } =
    searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));

  if (!searchParamsSuccess) {
    throw data({ message: "Invalid search params" }, { status: 400 });
  }
}

export default function LeaderboardLayout() {
  return <Outlet />;
}
