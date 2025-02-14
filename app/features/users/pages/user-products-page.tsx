import type { Route } from "./+types/user-products-page";
import { ProductCard } from "~/features/products/components/product-card";
export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Products / wemake` },
    { name: "description", content: "Products submitted by user" },
  ];
}

export default function UserProductsPage() {
  return (
    <div className="flex flex-col gap-5">
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
  );
}
