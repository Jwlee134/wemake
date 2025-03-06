import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-daily-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { getServerClient } from "~/supa-client";

// paramsSchema is used to validate the params from the route
// z.coerce.number() is used to convert the params to numbers
const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export function meta({ params }: Route.MetaArgs) {
  const date = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  });
  return [
    { title: `The best of ${date.toLocaleString(DateTime.DATE_MED)} | wemake` },
    { name: "description", content: "Daily product leaderboard" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
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

  const url = new URL(request.url);

  const { client } = getServerClient(request);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    page: Number(url.searchParams.get("page") ?? 1),
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });

  return { ...parsedData, products, totalPages };
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
