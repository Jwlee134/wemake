import type { Route } from "./+types/categories-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories | wemake" },
    { name: "description", content: "Browse product categories" },
  ];
}

export default function CategoriesPage() {
  return (
    <div>
      <h1>Categories Page</h1>
    </div>
  );
}
