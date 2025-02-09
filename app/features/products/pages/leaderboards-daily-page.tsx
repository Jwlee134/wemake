import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-daily-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Daily Leaderboard | wemake" },
    { name: "description", content: "Daily product leaderboard" },
  ];
}

// paramsSchema is used to validate the params from the route
// z.coerce.number() is used to convert the params to numbers
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data({ message: "Invalid date" }, { status: 400 });
  }

  const date = DateTime.fromObject(parsedData);
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");

  if (!date.isValid || (date.isValid && date > today)) {
    // When an error thrown with a message, it will be caught by the nearest ErrorBoundary
    // You can either throw new Error or use data()
    throw data({ message: "Invalid date" }, { status: 400 });
    // throw new Error("Invalid date!!");
  }

  return { date };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // When an error is thrown with data() and 4xx/5xx status code, it will be caught here
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        Error in Daily Leaderboard Page
        <p>{error.data.message}</p>
      </div>
    );
  }
  // When an error is thrown with Error instance, it will be caught here
  if (error instanceof Error) {
    return (
      <div>
        Error in Daily Leaderboard Page
        <p>{error.message}</p>
      </div>
    );
  }
  return <div>Unknown Error</div>;
}

export default function LeaderboardsDailyPage({
  loaderData,
}: Route.ComponentProps) {
  return <div>Daily Leaderboard Page</div>;
}
