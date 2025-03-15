import { Form, Link, useActionData, useOutletContext } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useState, useEffect } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";
import type { action } from "../pages/post-page";

interface PostReplyProps {
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
  topLevelId: number;
  replies?: {
    reply_id: number;
    content: string;
    created_at: string;
    author: {
      profile_id: string;
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export default function PostReply({
  userId,
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  topLevelId,
  replies,
}: PostReplyProps) {
  const {
    isLoggedIn,
    username: loggedInUsername,
    avatar: loggedInAvatar,
  } = useOutletContext<{
    isLoggedIn: boolean;
    username: string | null;
    avatar: string | null;
  }>();
  const [replying, setReplying] = useState(false);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success) {
      setReplying(false);
    }
  }, [actionData?.success]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-start gap-5 w-3/4">
        <Avatar className="size-14">
          <AvatarFallback>{username.slice(0, 1)}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex items-center">
            <Link to={`/users/${userId}`}>
              <h4 className="font-medium text-lg">{username}</h4>
            </Link>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{content}</p>
          {isLoggedIn && (
            <Button
              variant="ghost"
              className="self-end"
              onClick={() => setReplying((prev) => !prev)}
            >
              <MessageCircleIcon className="size-4" /> Reply
            </Button>
          )}
        </div>
      </div>
      {replying && (
        <Form className="flex items-start gap-5 w-3/4" method="post">
          <input type="hidden" name="parentId" value={topLevelId} />
          <Avatar className="size-14">
            <AvatarFallback>{loggedInUsername?.charAt(0)}</AvatarFallback>
            <AvatarImage src={loggedInAvatar ?? ""} />
          </Avatar>
          <div className="flex flex-col gap-5 w-full items-end">
            <Textarea
              placeholder="Add a comment"
              className="w-full resize-none"
              rows={5}
              name="reply"
              defaultValue={`@${username}`}
            />
            <Button type="submit">Reply</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className="pl-20">
          {replies?.map((reply) => (
            <PostReply
              key={reply.reply_id}
              userId={reply.author.profile_id}
              username={reply.author.username}
              avatarUrl={reply.author.avatar ?? ""}
              content={reply.content}
              timestamp={reply.created_at}
              topLevel={false}
              topLevelId={reply.reply_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
