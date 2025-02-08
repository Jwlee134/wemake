import type { Route } from "./+types/submit-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
}

export default function SubmitPage() {
  return (
    <div>
      <h1>Submit Page</h1>
    </div>
  );
}
