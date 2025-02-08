import type { Route } from "./+types/search-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search Products | wemake" },
    { name: "description", content: "Search for products" },
  ];
}

export default function SearchPage() {
  return (
    <div>
      <h1>Search Page</h1>
    </div>
  );
}
