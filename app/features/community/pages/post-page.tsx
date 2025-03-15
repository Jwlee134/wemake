import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link, useOutletContext, useNavigation } from "react-router";
import { ChevronUpIcon, DotIcon, Loader2Icon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import PostReply from "~/features/community/components/post-reply";
import { getPostById, getPostReplies } from "../queries";
import { z } from "zod";
import { DateTime } from "luxon";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { createReply } from "../mutations";
import { useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "View community post" },
  ];
}

const paramsSchema = z.object({
  postId: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Response("Not Found", { status: 404 });
  }

  const { client } = getServerClient(request);

  const [post, replies] = await Promise.all([
    getPostById(client, data.postId),
    getPostReplies(client, data.postId),
  ]);

  return { post, replies };
}

const formSchema = z.object({
  reply: z.string().min(1),
  parentId: z.coerce.number().optional(),
});

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const result = formSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors, success: false };
  }

  const { reply, parentId } = result.data;

  await createReply(client, {
    postId: params.postId,
    content: reply,
    userId,
    parentId,
  });

  return { success: true, fieldErrors: null };
}

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    username: string | null;
    avatar: string | null;
  }>();
  const { post, replies } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
    }
  }, [actionData?.success]);

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
              <Link to={`/community?topic=${post.topic_slug}`}>
                {post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${post.post_id}`}>{post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant={"outline"} className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>{post.upvotes}</span>
            </Button>
            <div className="space-y-20 w-full">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>{post.author_name}</span>
                  <DotIcon className="size-4" />
                  <span>{DateTime.fromISO(post.created_at).toRelative()}</span>
                  <DotIcon className="size-4" />
                  <span>{post.replies_count} replies</span>
                </div>
                <p className="text-sm text-muted-foreground w-3/4">
                  {post.content}
                </p>
              </div>
              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className="flex items-start gap-5 w-3/4"
                  method="post"
                >
                  <Avatar className="size-14">
                    <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
                    <AvatarImage src={avatar ?? ""} />
                  </Avatar>
                  <div className="flex flex-col gap-5 w-full items-end">
                    <Textarea
                      placeholder="Add a comment"
                      className="w-full resize-none"
                      rows={5}
                      name="reply"
                    />
                    {actionData?.fieldErrors?.reply && (
                      <p className="text-red-500 font-medium text-xs">
                        {actionData.fieldErrors.reply}
                      </p>
                    )}
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        "Reply"
                      )}
                    </Button>
                  </div>
                </Form>
              ) : null}
              <div className="space-y-10">
                <h4 className="text-lg font-semibold">
                  {replies.length} Replies
                </h4>
                {replies.map((reply) => (
                  <PostReply
                    key={reply.reply_id}
                    userId={reply.author.profile_id}
                    username={reply.author.username}
                    avatarUrl={reply.author.avatar ?? ""}
                    content={reply.content}
                    timestamp={reply.created_at}
                    topLevel
                    topLevelId={reply.reply_id}
                    replies={reply.replies}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarFallback>{post.author_name.slice(0, 1)}</AvatarFallback>
              <AvatarImage src={post.author_avatar} />
            </Avatar>
            <div className="flex flex-col gap-1 items-start">
              <h4 className="font-medium text-lg">{post.author_name}</h4>
              <Badge variant={"secondary"} className="capitalize">
                {post.author_role}
              </Badge>
            </div>
          </div>
          <div className="text-sm flex flex-col gap-2 text-muted-foreground">
            <span>
              🎂 Joined {DateTime.fromISO(post.author_created_at).toRelative()}
            </span>
            <span>🚀 Launched {post.products_count} projects</span>
          </div>
          <Button variant={"outline"} className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
