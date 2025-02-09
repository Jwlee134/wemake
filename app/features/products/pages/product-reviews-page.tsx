import type { Route } from "./+types/product-reviews-page";

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
