import Hero from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import TeamCard from "../components/team-card";
import { getTeams } from "../queries";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Teams | wemake" }];
}

export async function loader() {
  const teams = await getTeams({ limit: 10 });

  return { teams };
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  const { teams } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title="Teams" subtitle="Find a team looking for new members." />
      <div className="grid grid-cols-4 gap-4">
        {teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id.toString()}
            leaderName={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(",")}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
