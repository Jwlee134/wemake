import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";
import { DateTime } from "luxon";

interface PostReplyProps {
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
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
  replies,
}: PostReplyProps) {
  const [replying, setReplying] = useState(false);

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
          <Button
            variant="ghost"
            className="self-end"
            onClick={() => setReplying((prev) => !prev)}
          >
            <MessageCircleIcon className="size-4" /> Reply
          </Button>
        </div>
      </div>
      {replying && (
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
            />
          ))}
        </div>
      )}
    </div>
  );
}
