import Hero from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Button } from "~/common/components/ui/button";
import { Await, data, Form, Link, useSearchParams } from "react-router";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getPostTopics } from "../queries";
import { Suspense } from "react";
import { z } from "zod";
import { getServerClient } from "~/supa-client";

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["all", "today", "week", "month", "year"])
    .optional()
    .default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Community | wemake" },
    { name: "description", content: "Join our community discussions" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // const [postTopics, posts] = await Promise.all([getPostTopics(), getPosts()]);

  const { client } = getServerClient(request);

  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw data({ message: "Invalid search params" }, { status: 400 });
  }

  const topics = getPostTopics(client);
  const posts = getPosts(client, {
    limit: 20,
    sorting: parsedData.sorting,
    period: parsedData.period,
    keyword: parsedData.keyword,
    topic: parsedData.topic,
  });

  return { topics, posts };
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting");
  const period = searchParams.get("period");
  const keyword = searchParams.get("keyword");
  return (
    <div className="space-y-10 px-20">
      <Hero
        title="Community"
        subtitle="Ask questions, share ideas, and get help from the community"
      />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                    <span className="text-sm capitalize">
                      {sorting || "Newest"}
                    </span>
                    <ChevronDownIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        className="cursor-pointer"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            searchParams.set("sorting", option.value);
                            if (option.value === "newest") {
                              searchParams.delete("period");
                            }
                          }
                          setSearchParams(searchParams);
                        }}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
                      <span className="text-sm capitalize">
                        {period || "All Time"}
                      </span>
                      <ChevronDownIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          className="cursor-pointer"
                          onCheckedChange={(checked) => {
                            if (checked) {
                              searchParams.set("period", option.value);
                            }
                            setSearchParams(searchParams);
                          }}
                        >
                          {option.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <Input
                  type="text"
                  name="keyword"
                  defaultValue={keyword ?? ""}
                  placeholder="Search for discussions"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create Discussion</Link>
            </Button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={posts}>
              {(posts) => (
                <div className="space-y-5">
                  {posts.map((post) => (
                    <PostCard
                      key={post.post_id}
                      id={post.post_id}
                      title={post.title}
                      authorName={post.author_name}
                      authorAvatarUrl={post.author_avatar}
                      category={post.topic}
                      postedAt={post.created_at}
                      votesCount={post.upvotes}
                      expanded
                    />
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={topics}>
              {(topics) => (
                <div className="flex flex-col gap-4 items-start">
                  {topics.map((topic) => (
                    <Button
                      variant={"link"}
                      key={topic.slug}
                      className="pl-0"
                      asChild
                    >
                      <Link to={`/community?topic=${topic.slug}`}>
                        {topic.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </Await>
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
