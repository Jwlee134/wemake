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
import {
  getLoggedInUserId,
  getMessagesByRoomId,
  getRoomParticipants,
} from "../queries";
import { getServerClient } from "~/supa-client";
import { sendMessageToRoom } from "../mutations";
import { useEffect, useRef } from "react";

export function meta() {
  return [{ title: "Message | wemake" }];
}

export async function action({ request, params }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const message = formData.get("message") as string;

  await sendMessageToRoom(client, {
    senderId: userId,
    message,
    messageRoomId: parseInt(params.roomId),
  });

  return { success: true };
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const messages = await getMessagesByRoomId(client, {
    roomId: params.roomId,
    userId,
  });

  const participants = await getRoomParticipants(client, {
    roomId: params.roomId,
    userId,
  });

  return { messages, userId, participants };
}
export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { messages, userId, participants } = loaderData;
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      ref.current?.reset();
    }
  }, [actionData]);

  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          <Avatar className="size-14">
            <AvatarImage src={participants.profiles.avatar ?? ""} />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>{participants.profiles.name}</CardTitle>
            <CardDescription>
              <p>Last seen 12 hours ago</p>
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="overflow-y-auto py-10 flex flex-col justify-start h-full space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender.avatar ?? ""}
            message={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={ref}
            className="relative flex justify-end items-center"
            method="post"
          >
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
              name="message"
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
