import type { Route } from "./+types/leaderboards-monthly-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Monthly Leaderboard | wemake" },
    { name: "description", content: "Monthly product leaderboard" },
  ];
}

export default function LeaderboardsMonthlyPage() {
  return (
    <div>
      <h1>Monthly Leaderboard Page</h1>
    </div>
  );
}
