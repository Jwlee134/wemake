import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import PostReply from "~/features/community/components/post-reply";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "View community post" },
  ];
}

export default function PostPage({ params }: Route.ComponentProps) {
  const { postId } = params;

  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${postId}`}>
                What is the best way to learn React?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant={"outline"} className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>100</span>
            </Button>
            <div className="space-y-20">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  What is the best way to learn React?
                </h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>@Jaewon</span>
                  <DotIcon className="size-4" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-4" />
                  <span>10 replies</span>
                </div>
                <p className="text-sm text-muted-foreground w-3/4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quisquam, quos.
                </p>
              </div>
              <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                  <AvatarFallback>N</AvatarFallback>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div className="flex flex-col gap-5 w-full items-end">
                  <Textarea
                    placeholder="Add a comment"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button type="submit">Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="text-lg font-semibold">Replies</h4>
                <PostReply
                  username="Jaewon"
                  avatarUrl="https://github.com/shadcn.png"
                  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                  timestamp="2 hours ago"
                  topLevel
                />
              </div>
            </div>
          </div>
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
          <div className="text-sm flex flex-col gap-2 text-muted-foreground">
            <span>🎂 Joined 2 months ago</span>
            <span>🚀 Launched 100+ projects</span>
          </div>
          <Button variant={"outline"} className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
