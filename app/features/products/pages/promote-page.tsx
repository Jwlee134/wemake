import type { Route } from "./+types/promote-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Promote Product | wemake" },
    { name: "description", content: "Promote your product" },
  ];
}

export default function PromotePage() {
  return (
    <div>
      <h1>Promote Page</h1>
    </div>
  );
}
