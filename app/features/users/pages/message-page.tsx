import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "~/features/users/components/message-bubble";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Message | wemake" }];
}

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>
              <p>Last seen 12 hours ago</p>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="overflow-y-auto py-10 flex flex-col justify-start h-full">
        {Array.from({ length: 10 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/shadcn.png"
            message="This is a message from John Doe to you. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
            />
            <Button type="submit" size={"icon"} className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
