import type { Route } from "./+types/category-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import {
  getProductCategory,
  getProductsByCategory,
  getCategoryPages,
} from "../queries";
import { z } from "zod";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Category | wemake" },
    { name: "description", content: "Products in this category" },
  ];
}

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
});

const querySchema = z.object({
  page: z.coerce.number().default(1),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  const { success: querySuccess, data: queryData } = querySchema.safeParse({
    page,
  });

  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Response("Invalid category ID", { status: 400 });
  }

  if (!querySuccess) {
    throw new Response("Invalid query params", { status: 400 });
  }

  const [category, products, categoryPages] = await Promise.all([
    getProductCategory(data.categoryId.toString()),
    getProductsByCategory({
      categoryId: data.categoryId,
      page: queryData.page,
    }),
    getCategoryPages({ categoryId: data.categoryId }),
  ]);

  return { category, products, categoryPages };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products, categoryPages } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title={category.name} subtitle={category.description} />
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={categoryPages} />
    </div>
  );
}
