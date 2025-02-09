import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { DialogContent } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import { cn } from "~/lib/utils";

export function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">
          What do you think of this product?
        </DialogTitle>
        <DialogDescription>
          Share your thoughts with other users
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-6">
        <div>
          <Label className="flex flex-col gap-0.5">
            Rating
            <small className="text-muted-foreground">
              How would you rate this product?
            </small>
          </Label>
          <div className="flex mt-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <label
                key={index}
                className="relative [&:not(:last-child)]:pr-2"
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <StarIcon
                  className={cn(
                    "size-4 text-yellow-400",
                    hoveredRating >= index + 1 ||
                      (!hoveredRating && rating >= index + 1)
                      ? "fill-yellow-400"
                      : "fill-transparent"
                  )}
                />
                <input
                  type="radio"
                  name="rating"
                  value={index + 1}
                  required
                  className="opacity-0 absolute size-px"
                  onClick={() => setRating(index + 1)}
                />
              </label>
            ))}
          </div>
        </div>
        <InputWithLabel
          textarea
          label="Write a review"
          description="Maximum 1000 characters"
          placeholder="Tell us more about your experience with this product"
          required
        />
        <DialogFooter>
          <Button type="submit">Submit review</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
