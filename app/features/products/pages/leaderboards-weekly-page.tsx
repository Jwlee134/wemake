import type { Route } from "./+types/leaderboards-weekly-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weekly Leaderboard | wemake" },
    { name: "description", content: "Weekly product leaderboard" },
  ];
}

export default function LeaderboardsWeeklyPage() {
  return (
    <div>
      <h1>Weekly Leaderboard Page</h1>
    </div>
  );
}
