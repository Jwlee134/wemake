import { Form } from "react-router";
import type { Route } from "./+types/submit-page";
import Hero from "~/common/components/hero";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
}

export default function ProductSubmitPage() {
  const [icon, setIcon] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your creation with the world"
      />
      <Form
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
        method="post"
      >
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
          <Button type="submit" className="w-full" size={"lg"}>
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-md overflow-hidden">
            {icon && (
              <img src={icon} alt="Icon" className="size-full object-cover" />
            )}
          </div>
          <Label className="flex flex-col gap-0.5">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product.
            </small>
          </Label>
          <Input
            name="icon"
            type="file"
            className="w-1/2"
            onChange={handleFileChange}
            required
          />
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>Recommended size: 128x128px</span>
            <span>Allowed format: PNG, JPEG</span>
            <span>Maximum size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
