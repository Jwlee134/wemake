import Hero from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { data, Form, redirect, useNavigation } from "react-router";
import { DateTime } from "luxon";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { claimIdea } from "../mutations";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Idea #${data.idea.idea_id} | wemake` },
    { name: "description", content: data.idea.idea },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const idea = await getGptIdea(client, { id: params.ideaId });

  if (!idea) {
    throw data({ message: "Idea not found" }, { status: 404 });
  }

  if (idea.is_claimed) {
    throw redirect("/ideas");
  }

  return { idea };
}

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const idea = await getGptIdea(client, { id: params.ideaId });

  if (idea.is_claimed) {
    return { success: false };
  }

  await claimIdea({ client, ideaId: params.ideaId, userId });

  return redirect(`/my/dashboard/ideas`);
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  const { idea } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
        {idea.is_claimed ? null : (
          <Form method="post">
            <Button size={"lg"} type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Claiming..." : "Claim idea now →"}
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
