import { Form } from "react-router";
import type { Route } from "./+types/submit-page";
import Hero from "~/common/components/hero";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
}

export default function SubmitPage() {
  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your creation with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputWithLabel
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            required
            type="text"
            placeholder="Name of your product"
          />
          <InputWithLabel
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise tagline for your product"
          />
          <InputWithLabel
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          <InputWithLabel
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
            textarea
          />
          <SelectWithLabel
            name="category"
            label="Category"
            description="The category of your product"
            placeholder="Select a category"
            options={[
              { label: "Productivity", value: "productivity" },
              { label: "Entertainment", value: "entertainment" },
              { label: "Education", value: "education" },
              { label: "Other", value: "other" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
