import Hero from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import CategoryCard from "../components/category-card";
import { getProductCategories } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Categories | wemake" },
    { name: "description", content: "Browse product categories" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const categories = await getProductCategories(client);

  return { categories };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title="Categories" subtitle="Browse product by categories" />
      <div className="grid grid-cols-4 gap-10">
        {categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id.toString()}
            title={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
