import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { CreateReviewDialog } from "../components/create-review-dialog";
import { getProductReviews } from "../queries";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const reviews = await getProductReviews(client, params.productId!);

  return { reviews };
}

const formSchema = z.object({
  review: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
});

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const result = formSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const { review, rating } = result.data;

  await createProductReview(client, {
    productId: Number(params.productId),
    userId,
    review,
    rating,
  });

  return { fieldErrors: null };
}

export default function ProductReviewsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { reviews } = loaderData;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (actionData?.fieldErrors === null) {
      setOpen(false);
    }
  }, [actionData?.fieldErrors]);

  return (
    <div className="space-y-10 max-w-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
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
