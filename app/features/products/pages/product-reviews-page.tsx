import type { Route } from "./+types/product-reviews-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Product Reviews | wemake` },
    { name: "description", content: "Product reviews and ratings" },
  ];
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Product Reviews</h1>
      {/* List of reviews would be displayed here */}
    </div>
  );
}
