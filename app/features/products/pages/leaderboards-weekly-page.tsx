import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-weekly-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({ params }: Route.MetaArgs) {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  });

  return [
    {
      title: `The best of week ${date
        .startOf("week")
        .toLocaleString(DateTime.DATE_SHORT)} - ${date
        .endOf("week")
        .toLocaleString(DateTime.DATE_SHORT)} | wemake`,
    },
    { name: "description", content: "Weekly product leaderboard" },
  ];
}

// paramsSchema is used to validate the params from the route
// z.coerce.number() is used to convert the params to numbers
const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data({ message: "Invalid date" }, { status: 400 });
  }

  const date = DateTime.fromObject({
    weekYear: parsedData.year,
    weekNumber: parsedData.week,
  });
  const today = DateTime.now().startOf("week");

  if (!date.isValid || (date.isValid && date > today)) {
    // When an error thrown with a message, it will be caught by the nearest ErrorBoundary
    // You can either throw new Error or use data()
    throw data({ message: "Invalid date" }, { status: 400 });
    // throw new Error("Invalid date!!");
  }

  const url = new URL(request.url);

  const { client } = getServerClient(request);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
    page: Number(url.searchParams.get("page") ?? 1),
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("week"),
    endDate: date.endOf("week"),
  });

  return { ...parsedData, products, totalPages };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // When an error is thrown with data() and 4xx/5xx status code, it will be caught here
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        Error in Weekly Leaderboard Page
        <p>{error.data.message}</p>
      </div>
    );
  }
  // When an error is thrown with Error instance, it will be caught here
  if (error instanceof Error) {
    return (
      <div>
        Error in Weekly Leaderboard Page
        <p>{error.message}</p>
      </div>
    );
  }
  return <div>Unknown Error</div>;
}

export default function LeaderboardsWeeklyPage({
  loaderData,
}: Route.ComponentProps) {
  const date = DateTime.fromObject({
    weekYear: loaderData.year,
    weekNumber: loaderData.week,
  });
  const isThisWeek = date.equals(DateTime.now().startOf("week"));

  const previousWeek = date.minus({ week: 1 });
  const nextWeek = date.plus({ week: 1 });

  return (
    <div className="space-y-10">
      <Hero
        title={`The best of week ${date
          .startOf("week")
          .toLocaleString(DateTime.DATE_SHORT)} - ${date
          .endOf("week")
          .toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex items-center gap-2 justify-center">
        <Button variant={"secondary"} asChild>
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}
            replace
          >
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isThisWeek ? (
          <Button variant={"secondary"} asChild>
            <Link
              to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}
              replace
            >
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
