import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-daily-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export function meta({ data }: Route.MetaArgs) {
  const date = DateTime.fromObject(data);
  return [
    { title: `The best of ${date.toLocaleString(DateTime.DATE_MED)} | wemake` },
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
  const today = DateTime.now().startOf("day");

  if (!date.isValid || (date.isValid && date > today)) {
    // When an error thrown with a message, it will be caught by the nearest ErrorBoundary
    // You can either throw new Error or use data()
    throw data({ message: "Invalid date" }, { status: 400 });
    // throw new Error("Invalid date!!");
  }
  return { ...parsedData };
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
  const date = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
  });
  const isToday = date.equals(DateTime.now().startOf("day"));

  const previousDate = date.minus({ day: 1 });
  const nextDate = date.plus({ day: 1 });

  return (
    <div className="space-y-10">
      <Hero title={`The best of ${date.toLocaleString(DateTime.DATE_MED)}`} />
      <div className="flex items-center gap-2 justify-center">
        <Button variant={"secondary"} asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDate.toFormat(
              "yyyy/MM/dd"
            )}`}
            replace
          >
            &larr; {previousDate.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday ? (
          <Button variant={"secondary"} asChild>
            <Link
              to={`/products/leaderboards/daily/${nextDate.toFormat(
                "yyyy/MM/dd"
              )}`}
              replace
            >
              {nextDate.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id="productId"
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={12}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
