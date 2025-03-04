import Hero from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { data } from "react-router";
import { DateTime } from "luxon";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Idea #${data.idea.idea_id} | wemake` },
    { name: "description", content: data.idea.idea },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const idea = await getGptIdea({ id: params.ideaId });

  if (!idea) {
    throw data({ message: "Idea not found" }, { status: 404 });
  }

  return { idea };
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  const { idea } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title={`Idea #${idea.idea_id}`} />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">{idea.idea}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>{idea.views} views</span>
          </div>
          <DotIcon className="size-4" />
          <span>{DateTime.fromISO(idea.created_at).toRelative()}</span>
          <DotIcon className="size-4" />
          <Button variant="outline" className="flex items-center">
            <HeartIcon className="size-4" />
            <span>{idea.likes}</span>
          </Button>
        </div>
        <Button size={"lg"}>Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
