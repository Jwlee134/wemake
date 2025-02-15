import { Outlet } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/common/components/ui/sidebar";
import { MessageCard } from "~/features/users/components/message-card";

export default function MessagesLayout() {
  return (
    <SidebarProvider className="max-h-[calc(100svh-14rem)] overflow-hidden h-[calc(100svh-14rem)] min-h-full">
      <Sidebar className="pt-16" variant="floating">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 20 }).map((_, index) => (
                <MessageCard
                  key={index}
                  messageId={`${index}`}
                  avatarUrl="https://github.com/shadcn.png"
                  name="John Doe"
                  lastMessage="Last Message"
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="w-full">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
