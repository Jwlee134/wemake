import Hero from "~/common/components/hero";
import type { Route } from "./+types/team-submit-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { PRODUCT_STAGES } from "../constants";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Submit Team | wemake" }];
}

export default function TeamSubmitPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Submit Team" subtitle="Submit a team to the community." />
      <Form className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center">
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputWithLabel
            label="What is the name of your product?"
            name="name"
            placeholder="e.g. My Startup"
            maxLength={20}
            required
            id="name"
            description="(20 characters max)"
          />
          <SelectWithLabel
            label="What is the stage of your product?"
            name="stage"
            options={PRODUCT_STAGES}
            required
            placeholder="Select product stage"
            description="Select the stage of your product"
          />
          <InputWithLabel
            label="What is the size of your team?"
            name="size"
            placeholder="Enter team size"
            maxLength={100}
            minLength={1}
            required
            id="size"
            description="(1-100)"
          />
          <InputWithLabel
            label="How much equity are you willing to offer?"
            name="equity"
            placeholder="Enter equity"
            maxLength={100}
            required
            id="equity"
            description="(*each)"
          />
          <InputWithLabel
            label="What roles are you looking for?"
            name="roles"
            placeholder="e.g. React Developer, Backend Developer"
            maxLength={100}
            required
            id="roles"
            description="(comma separated)"
          />
          <InputWithLabel
            label="What is the description of your product?"
            name="description"
            placeholder="e.g. We are a team of 3 people looking for a React Developer and a Backend Developer to build a social media platform."
            maxLength={200}
            required
            id="description"
            description="(200 characters max)"
            textarea
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Submit team
        </Button>
      </Form>
    </div>
  );
}
