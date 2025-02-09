import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import type { Route } from "./+types/product-overview-layout";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary"></div>
          <div>
            <h1 className="text-5xl font-bold">Product Name</h1>
            <p className="text-2xl font-light text-muted-foreground">
              Product Description
            </p>
            <div className="mt-5 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className="size-4 text-yellow-500"
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">100 reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size={"lg"}
            className="text-lg h-14 px-10"
          >
            Visit Website
          </Button>
          <Button size={"lg"} className="text-lg h-14 px-10">
            <ChevronUpIcon />
            Upvote (100)
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
        <Outlet />
      </div>
    </div>
  );
}
