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

interface PostReplyProps {
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
}

export default function PostReply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
}: PostReplyProps) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-5 w-3/4">
        <Avatar className="size-14">
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex items-center">
            <Link to={`/users/@${username.toLowerCase()}`}>
              <h4 className="font-medium text-lg">{username}</h4>
            </Link>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">{timestamp}</span>
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
      {topLevel && (
        <div className="pl-20">
          <PostReply
            username="Jaewon"
            avatarUrl="https://github.com/shadcn.png"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            timestamp="2 hours ago"
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
