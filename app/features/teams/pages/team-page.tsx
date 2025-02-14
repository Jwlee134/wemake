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

export function meta({ matches, params }: Route.MetaArgs) {
  return [{ title: `Team ${params.teamId} | wemake` }];
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Join Jaewon's team" />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product name",
              value: "My Startup",
            },
            {
              title: "Stage",
              value: "MVP",
            },
            {
              title: "Team size",
              value: "3",
            },
            {
              title: "Equity offered",
              value: "10%",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="font-bold text-2xl">
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
                {[
                  "React Developer",
                  "Backend Developer",
                  "Full Stack Developer",
                  "DevOps Engineer",
                  "Product Manager",
                ].map((role) => (
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
              <p>
                We are a team of 3 people looking for a React Developer and a
                Backend Developer to build a social media platform.
              </p>
            </CardContent>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium text-lg">Jaewon</h4>
              <Badge variant={"secondary"}>Entrepreneur</Badge>
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
