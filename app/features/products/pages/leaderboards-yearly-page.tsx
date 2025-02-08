import type { Route } from "./+types/leaderboards-yearly-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Yearly Leaderboard | wemake" },
    { name: "description", content: "Yearly product leaderboard" },
  ];
}

export default function LeaderboardsYearlyPage() {
  return (
    <div>
      <h1>Yearly Leaderboard Page</h1>
    </div>
  );
}
