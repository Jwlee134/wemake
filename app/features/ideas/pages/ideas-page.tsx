import Hero from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 10);
  const ideas = await getGptIdeas({ limit });

  return { ideas };
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  const { ideas } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-4 gap-4">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id.toString()}
            title={idea.idea}
            viewsCount={idea.views}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
