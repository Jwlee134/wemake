import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl: string;
  username: string;
  message: string;
  timestamp: string;
  onMarkAsRead?: () => void;
  seen: boolean;
}

export function NotificationCard({
  avatarUrl,
  username,
  message,
  timestamp,
  onMarkAsRead,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[400px]", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row gap-5 items-start">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span> <span>{message}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">
            <time>{timestamp}</time>
          </small>
        </div>
      </CardHeader>
      <CardFooter className="justify-end">
        <Button variant="outline" size="icon" onClick={onMarkAsRead}>
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
