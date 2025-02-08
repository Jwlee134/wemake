import { data, redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";

// A page that redirects to the correct leaderboard page based on the period

// e.g. /products/leaderboards/daily -> /products/leaderboards/daily/2024/1/1
// e.g. /products/leaderboards/weekly -> /products/leaderboards/weekly/2024/1
// e.g. /products/leaderboards/monthly -> /products/leaderboards/monthly/2024/1
// e.g. /products/leaderboards/yearly -> /products/leaderboards/yearly/2024

export function loader({ params }: Route.LoaderArgs) {
  const period = params.period;

  let url = "";
  const today = DateTime.now().setZone("Asia/Seoul");

  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    // Create "responses" that contain status/headers without forcing serialization into an actual Response
    return data(null, { status: 400 });
  }

  return redirect(url);
}
