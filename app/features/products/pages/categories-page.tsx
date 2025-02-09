import Hero from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import CategoryCard from "../components/category-card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories | wemake" },
    { name: "description", content: "Browse product categories" },
  ];
}

export default function CategoriesPage() {
  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Browse product by categories" />
      <div className="grid grid-cols-4 gap-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={index}
            id={`category-${index}`}
            title={`Category ${index}`}
            description={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.`}
          />
        ))}
      </div>
    </div>
  );
}
