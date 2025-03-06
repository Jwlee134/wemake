import type { Route } from "./+types/user-products-page";
import { getUserProducts } from "../queries";
import { ProductCard } from "~/features/products/components/product-card";
import { getServerClient } from "~/supa-client";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Products / wemake` },
    { name: "description", content: "Products submitted by user" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const products = await getUserProducts(client, params.username!);

  return { products };
}

export default function UserProductsPage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div className="flex flex-col gap-5">
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
  );
}
