import { Link } from "react-router";
import type { Route } from "./+types/products-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products | wemake" },
    { name: "description", content: "Explore all products" },
  ];
}

export default function ProductsPage() {
  return (
    <div>
      <h1>Products Page</h1>
    </div>
  );
}
