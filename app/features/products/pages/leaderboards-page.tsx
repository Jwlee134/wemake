import type { Route } from "./+types/leaderboards-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Leaderboards | wemake" },
    { name: "description", content: "Product leaderboards" },
  ];
}

export default function LeaderboardsPage() {
  return (
    <div>
      <h1>Leaderboards Page</h1>
    </div>
  );
}
