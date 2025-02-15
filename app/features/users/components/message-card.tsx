import { Link, useLocation } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/common/components/ui/sidebar";

interface MessageCardProps {
  avatarUrl: string;
  name: string;
  lastMessage: string;
  messageId: string;
}

export default function MessageCard({
  avatarUrl,
  name,
  lastMessage,
  messageId,
}: MessageCardProps) {
  const fallbackInitial = name.charAt(0).toUpperCase();
  const location = useLocation();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="h-18"
        asChild
        isActive={location.pathname === `/my/messages/${messageId}`}
      >
        <Link to={`/my/messages/${messageId}`} replace>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{fallbackInitial}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{lastMessage}</p>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
