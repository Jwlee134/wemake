import Hero from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { z } from "zod";
import { getTeamById } from "../queries";
import { getServerClient } from "~/supa-client";

export function meta({ matches, params }: Route.MetaArgs) {
  return [{ title: `Team ${params.teamId} | wemake` }];
}

const paramsSchema = z.object({
  teamId: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Response("Not Found", { status: 404 });
  }

  const { client } = getServerClient(request);

  const team = await getTeamById(client, data.teamId);

  return { team };
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const { team } = loaderData;

  return (
    <div className="space-y-10">
      <Hero title={`Join ${team.team_leader.name}'s team`} />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product name",
              value: team.product_name,
            },
            {
              title: "Stage",
              value: team.product_stage,
            },
            {
              title: "Team size",
              value: team.team_size,
            },
            {
              title: "Equity offered",
              value: `${team.equity_split}%`,
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="font-bold text-2xl capitalize">
                <p>{item.value}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <ul className="text-lg font-bold list-disc list-inside">
                {team.roles.split(",").map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-medium">
              <p>{team.product_description}</p>
            </CardContent>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>
                {team.team_leader.name.slice(0, 1)}
              </AvatarFallback>
              {team.team_leader.avatar && (
                <AvatarImage src={team.team_leader.avatar} />
              )}
            </Avatar>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium text-lg">{team.team_leader.name}</h4>
              <Badge variant={"secondary"} className="capitalize">
                {team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputWithLabel
              label="Introduce yourself"
              name="introduction"
              placeholder="e.g. I'm a React Developer and I'm looking for a team to join."
              required
              id="introduction"
              description="Tell us about yourself"
              textarea
            />
            <Button type="submit" className="w-full">
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
