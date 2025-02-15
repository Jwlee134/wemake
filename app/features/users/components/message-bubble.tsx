import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarUrl?: string;
  message: string;
  isCurrentUser?: boolean;
}

export default function MessageBubble({
  avatarUrl,
  message,
  isCurrentUser = false,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isCurrentUser && "flex-row-reverse"
      )}
    >
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>N</AvatarFallback>
      </Avatar>
      <div
        className={cn({
          "rounded-2xl p-4 text-sm w-1/4": true,
          "bg-accent rounded-br-none": isCurrentUser,
          "bg-primary text-primary-foreground rounded-bl-none": !isCurrentUser,
        })}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}
