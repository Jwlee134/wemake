import { z } from "zod";
import type { Route } from "./+types/search-page";
import Hero from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getProductsBySearch, getPagesBySearch } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ];
}

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw new Error("Invalid params");
  }

  if (parsedData.query === "") {
    return { products: [], totalPages: 1 };
  }

  const { client } = getServerClient(request);

  const [products, totalPages] = await Promise.all([
    getProductsBySearch(client, {
      query: parsedData.query,
      page: parsedData.page,
    }),
    getPagesBySearch(client, { query: parsedData.query }),
  ]);

  return { products, totalPages };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { products, totalPages } = loaderData;

  return (
    <div className="space-y-10">
      <Hero
        title="Search"
        subtitle="Search for products by title or description"
      />
      <Form className="flex justify-center max-w-screen-sm mx-auto gap-2">
        <Input
          name="query"
          placeholder="Search for products"
          className="text-lg"
        />
        <Button type="submit">Search</Button>
      </Form>
      <div className="space-y-5 w-full max-w-screen-md mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <ProductPagination totalPages={totalPages} />
    </div>
  );
}
