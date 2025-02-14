import Hero from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Discussion | wemake" },
    {
      name: "description",
      content: "Create a new discussion to the community",
    },
  ];
}

export default function PostSubmitPage() {
  return (
    <div className="space-y-10">
      <Hero
        title="Submit Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputWithLabel
          id="title"
          label="Title"
          name="title"
          description="(40 characters or less)"
          required
          placeholder="e.g. What is the best way to learn React?"
        />
        <SelectWithLabel
          label="Category"
          name="category"
          description="Select the category of your discussion"
          required
          placeholder="e.g. React"
          options={[
            { label: "React", value: "react" },
            { label: "JavaScript", value: "javascript" },
            { label: "CSS", value: "css" },
          ]}
        />
        <InputWithLabel
          id="content"
          label="Content"
          name="content"
          textarea
          description="(1000 characters or less)"
          required
          placeholder="e.g. I'm having trouble understanding the concept of closures in JavaScript. Can someone help me?"
        />
        <Button type="submit" className="mx-auto">
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}
