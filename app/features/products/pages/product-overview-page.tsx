import { ChevronUpIcon, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Product Overview | wemake` },
    { name: "description", content: "Product overview and details" },
  ];
}

export default function ProductOverviewPage({
  loaderData,
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
        <Button variant="outline" asChild>
          <Link to={`/products/${productId}/overview`}>Overview</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/products/${productId}/reviews`}>Reviews</Link>
        </Button>
      </div>
      <div className="space-y-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">What is this product?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">How does it work?</h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
    </div>
  );
}
