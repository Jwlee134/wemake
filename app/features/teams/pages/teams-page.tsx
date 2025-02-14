import Hero from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import TeamCard from "../components/team-card";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Teams | wemake" }];
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Teams" subtitle="Find a team looking for new members." />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            id="teamId"
            leaderName="Jaewon"
            leaderAvatarUrl="https://github.com/jwlee134.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Project Manager",
            ]}
            projectDescription="a new social media platform"
          />
        ))}
      </div>
    </div>
  );
}
