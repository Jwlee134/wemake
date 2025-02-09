import Hero from "~/common/components/hero";
import type { Route } from "./+types/idea-page";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "IdeasGPT | wemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="Idea #432432" />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos."
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>123 views</span>
          </div>
          <DotIcon className="size-4" />
          <span>123 likes</span>
          <DotIcon className="size-4" />
          <Button variant="outline" className="flex items-center">
            <HeartIcon className="size-4" />
            <span>123</span>
          </Button>
        </div>
        <Button size={"lg"}>Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
