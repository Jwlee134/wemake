import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { CreateReviewDialog } from "../components/create-review-dialog";
import { getProductReviews } from "../queries";
import { getServerClient } from "~/supa-client";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const reviews = await getProductReviews(client, params.productId!);

  return { reviews };
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { reviews } = loaderData;

  return (
    <div className="space-y-10 max-w-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"}>Write a review</Button>
          </DialogTrigger>
          <CreateReviewDialog />
        </Dialog>
      </div>
      <div className="space-y-20">
        {reviews.map((review) => (
          <ReviewCard
            key={review.review_id}
            avatarUrl={review.user.avatar ?? ""}
            authorName={review.user.name}
            username={review.user.username}
            rating={review.rating}
            content={review.review}
            timestamp={review.created_at}
          />
        ))}
      </div>
    </div>
  );
}
