import type { Route } from "./+types/product-reviews-new-page";

export default function ProductReviewsNewPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>Write a Review</h1>
      {/* Review form would go here */}
    </div>
  );
}
