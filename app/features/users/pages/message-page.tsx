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
import {
  Form,
  useOutletContext,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import MessageBubble from "~/features/users/components/message-bubble";
import {
  getLoggedInUserId,
  getMessagesByRoomId,
  getRoomParticipants,
} from "../queries";
import { browserClient, getServerClient } from "~/supa-client";
import { sendMessageToRoom } from "../mutations";
import { useCallback, useEffect, useRef, useState } from "react";

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

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs) {
  return false;
}

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { avatar } = useOutletContext<{ avatar: string }>();
  const [messages, setMessages] = useState(loaderData.messages);
  const { userId, participants } = loaderData;
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      ref.current?.reset();
    }
  }, [actionData]);

  useEffect(() => {
    const channel = browserClient
      .channel(`room:${userId}-${participants.profiles.profile_id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as (typeof loaderData.messages)[number],
          ]);
        }
      );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const messageRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

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
        {messages.map((message, index) => (
          <MessageBubble
            key={message.message_id}
            ref={index === messages.length - 1 ? messageRef : undefined}
            avatarUrl={
              message.sender_id === userId
                ? avatar
                : participants.profiles.avatar ?? ""
            }
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
