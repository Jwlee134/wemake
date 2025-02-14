import type { Route } from "./+types/team-page";

export function meta({ matches, params }: Route.MetaArgs) {
  return [{ title: `Team ${params.teamId} | wemake` }];
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Team Details</h1>
    </div>
  );
}
