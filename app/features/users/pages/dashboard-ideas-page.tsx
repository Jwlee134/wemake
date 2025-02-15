import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Ideas | wemake" }];
}

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on your goals and preferences using a movile app to help you lose weight faster."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
