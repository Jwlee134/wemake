import type { Route } from "./+types/submit-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Post | wemake" },
    { name: "description", content: "Submit a new post to the community" },
  ];
}

export default function SubmitPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Submit Post</h1>
      {/* Add your submit form content here */}
    </div>
  );
}
