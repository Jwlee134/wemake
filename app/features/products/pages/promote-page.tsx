import Hero from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectWithLabel from "~/common/components/select-with-label";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promote Product | wemake" },
    { name: "description", content: "Promote your product" },
  ];
}

export default function PromotePage() {
  const [promotionDates, setPromotionDates] = useState<DateRange | undefined>();
  const totalDays =
    promotionDates?.from && promotionDates?.to
      ? DateTime.fromJSDate(promotionDates.to).diff(
          DateTime.fromJSDate(promotionDates.from),
          "days"
        ).days
      : 0;

  return (
    <div>
      <Hero
        title="Promote Your Product"
        subtitle="Boost your product's visibility and reach more customers"
      />
      <Form className="max-w-md mx-auto flex flex-col gap-10 items-center">
        <SelectWithLabel
          name="product"
          label="Product"
          description="Choose the product you want to promote"
          placeholder="Select a product"
          options={[
            { label: "Product 1", value: "product-1" },
            { label: "Product 2", value: "product-2" },
            { label: "Product 3", value: "product-3" },
          ]}
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-0.5">
            Select a range of dates for promotion
            <small className="text-muted-foreground block text-center">
              Minimum promotion duration is 3 days.
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionDates}
            onSelect={setPromotionDates}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={!promotionDates}>
          Go to checkout (${totalDays * 10})
        </Button>
      </Form>
    </div>
  );
}
