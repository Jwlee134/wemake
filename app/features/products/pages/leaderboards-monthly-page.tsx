import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-monthly-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";

export function meta({ data }: Route.MetaArgs) {
  const date = DateTime.fromObject({
    year: data.year,
    month: data.month,
  });
  return [
    {
      title: `The best of ${date.toLocaleString({
        year: "numeric",
        month: "long",
      })} | wemake`,
    },
    { name: "description", content: "Monthly product leaderboard" },
  ];
}

// paramsSchema is used to validate the params from the route
// z.coerce.number() is used to convert the params to numbers
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export function loader({ params }: Route.LoaderArgs) {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data({ message: "Invalid date" }, { status: 400 });
  }

  const date = DateTime.fromObject({
    year: parsedData.year,
    month: parsedData.month,
  });
  const today = DateTime.now().startOf("month");

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
        Error in Monthly Leaderboard Page
        <p>{error.data.message}</p>
      </div>
    );
  }
  // When an error is thrown with Error instance, it will be caught here
  if (error instanceof Error) {
    return (
      <div>
        Error in Monthly Leaderboard Page
        <p>{error.message}</p>
      </div>
    );
  }
  return <div>Unknown Error</div>;
}

export default function LeaderboardsMonthlyPage({
  loaderData,
}: Route.ComponentProps) {
  const date = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const isThisMonth = date.equals(DateTime.now().startOf("month"));

  const previousMonth = date.minus({ month: 1 });
  const nextMonth = date.plus({ month: 1 });

  return (
    <div className="space-y-10">
      <Hero
        title={`The best of ${date.toLocaleString({
          year: "numeric",
          month: "long",
        })}`}
      />
      <div className="flex items-center gap-2 justify-center">
        <Button variant={"secondary"} asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
            replace
          >
            &larr;{" "}
            {previousMonth.toLocaleString({
              year: "numeric",
              month: "long",
            })}
          </Link>
        </Button>
        {!isThisMonth ? (
          <Button variant={"secondary"} asChild>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
              replace
            >
              {nextMonth.toLocaleString({
                year: "numeric",
                month: "long",
              })}
              &rarr;
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
