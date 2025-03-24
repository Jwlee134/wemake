import { Outlet, useOutletContext } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import MessageCard from "~/features/users/components/message-card";
import type { Route } from "./+types/messages-layout";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "~/features/users/queries";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const messages = await getMessages(client, userId);

  return { messages };
}

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { avatar } = useOutletContext<{ avatar: string }>();
  return (
    <SidebarProvider className="max-h-[calc(100svh-14rem)] overflow-hidden h-[calc(100svh-14rem)] min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message) => (
                <MessageCard
                  key={message.message_room_id}
                  messageId={message.message_room_id.toString()}
                  avatarUrl={message.avatar}
                  name={message.name}
                  lastMessage={message.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full">
        <Outlet context={{ avatar }} />
      </div>
    </SidebarProvider>
  );
}
