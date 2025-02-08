import type { Route } from "./+types/category-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Category | wemake" },
    { name: "description", content: "Products in this category" },
  ];
}

export default function CategoryPage() {
  return (
    <div>
      <h1>Category Page</h1>
    </div>
  );
}
