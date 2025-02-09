import type { Route } from "./+types/category-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Category | wemake" },
    { name: "description", content: "Products in this category" },
  ];
}

export default function CategoryPage() {
  return (
    <div className="space-y-10">
      <Hero
        title="Developer Tools"
        subtitle="Tools for developers to build products faster"
      />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id="productId"
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={12}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
}
