import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import type { Route } from "./+types/product-overview-layout";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import { getProductById } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({ data: { product } }: Route.MetaArgs) {
  return [
    { title: `${product.name} | wemake` },
    { name: "description", content: product.description },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const product = await getProductById(client, params.productId!);

  return { product };
}

export default function ProductOverviewLayout({
  loaderData,
  params: { productId },
}: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="space-y-10 px-20">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary"></div>
          <div>
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <p className="text-2xl font-light text-muted-foreground">
              {product.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-4 text-yellow-500"
                    fill={
                      index < Math.floor(product.avg_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.reviews} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            variant="secondary"
            size={"lg"}
            className="text-lg h-14 px-10"
          >
            <Link to={`/products/${productId}/visit`}>Visit Website</Link>
          </Button>
          <Button size={"lg"} className="text-lg h-14 px-10">
            <ChevronUpIcon />
            Upvote ({product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        {/* With NavLink, you can have the ability to check if the specified route is the current route */}
        <NavLink
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive ? "bg-accent" : "",
            ])
          }
          to={`/products/${productId}/overview`}
        >
          Overview
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn([
              buttonVariants({ variant: "outline" }),
              isActive ? "bg-accent" : "",
            ])
          }
          to={`/products/${productId}/reviews`}
        >
          Reviews
        </NavLink>
      </div>
      {/* All the routes that are specified as children of the layout will be rendered here */}
      <div>
        <Outlet
          context={{
            description: product.description,
            how_it_works: product.how_it_works,
          }}
        />
      </div>
    </div>
  );
}
