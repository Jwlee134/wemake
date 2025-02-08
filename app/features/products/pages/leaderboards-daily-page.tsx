import type { Route } from "./+types/leaderboards-daily-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Daily Leaderboard | wemake" },
    { name: "description", content: "Daily product leaderboard" },
  ];
}

export default function LeaderboardsDailyPage() {
  return (
    <div>
      <h1>Daily Leaderboard Page</h1>
    </div>
  );
}
