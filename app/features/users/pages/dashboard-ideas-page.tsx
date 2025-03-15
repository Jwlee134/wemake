import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import { getLoggedInUserId } from "../queries";
import { getServerClient } from "~/supa-client";
import { getClaimedIdeas } from "~/features/ideas/queries";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Dashboard Ideas | wemake" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);
  const claimedIdeas = await getClaimedIdeas(client, { userId });

  return { claimedIdeas };
}

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  const { claimedIdeas } = loaderData;

  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-4">
        {claimedIdeas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id.toString()}
            title={idea.idea}
            isOwned
          />
        ))}
      </div>
    </div>
  );
}
