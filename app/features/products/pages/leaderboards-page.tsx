import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/leaderboards-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { getProductsByDateRange } from "../queries";
import { DateTime } from "luxon";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Product leaderboards" },
  ];
}

export async function loader() {
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      getProductsByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
      }),
    ]);

  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts,
  };
}

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  const { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts } =
    loaderData;

  return (
    <div className="space-y-20">
      <Hero
        title="Leaderboards"
        subtitle="The most popular products on wemake"
      />
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by day.
          </p>
        </div>
        {dailyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg self-center">
          <Link to={"/products/leaderboards/daily"}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by week.
          </p>
        </div>
        {weeklyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg self-center">
          <Link to={"/products/leaderboards/weekly"}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by month.
          </p>
        </div>
        {monthlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg self-center">
          <Link to={"/products/leaderboards/monthly"}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products on wemake by year.
          </p>
        </div>
        {yearlyProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
        <Button variant={"link"} asChild className="text-lg self-center">
          <Link to={"/products/leaderboards/yearly"}>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
