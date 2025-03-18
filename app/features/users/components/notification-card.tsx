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
import { Button, buttonVariants } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link, useFetcher } from "react-router";

interface NotificationCardProps {
  avatarUrl: string;
  id: number;
  username: string;
  type: "review" | "follow" | "reply" | "mention";
  timestamp: string;
  onMarkAsRead?: () => void;
  seen: boolean;
  productName: string;
  postTitle: string;
  payloadId: number | null;
}

const notificationType = {
  review: "reviewed your product",
  follow: "followed you",
  reply: "replied to your post",
  mention: "mentioned you in a post",
};

export function NotificationCard({
  avatarUrl,
  username,
  id,
  type,
  timestamp,
  onMarkAsRead,
  seen,
  productName,
  postTitle,
  payloadId,
}: NotificationCardProps) {
  const fetcher = useFetcher();
  const optimisticSeen = fetcher.state === "idle" ? seen : true;

  return (
    <Card
      className={cn("min-w-[400px]", optimisticSeen ? "" : "bg-yellow-500/60")}
    >
      <CardHeader className="flex flex-row gap-5 items-start">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{username}</span> <span>{notificationType[type]}</span>{" "}
            {productName && (
              <Link
                to={`/products/${payloadId}`}
                className={cn(buttonVariants({ variant: "ghost" }), "text-lg")}
              >
                {productName}
              </Link>
            )}
            {postTitle && (
              <Link
                to={`/posts/${payloadId}`}
                className={cn(buttonVariants({ variant: "ghost" }), "text-lg")}
              >
                {postTitle}
              </Link>
            )}
          </CardTitle>
          <small className="text-muted-foreground text-sm">
            <time>{timestamp}</time>
          </small>
        </div>
      </CardHeader>
      <CardFooter className="justify-end">
        {optimisticSeen ? null : (
          <fetcher.Form method="POST" action={`/my/notifications/${id}/read`}>
            <Button variant="outline" size="icon" type="submit">
              <EyeIcon className="size-4" />
            </Button>
          </fetcher.Form>
        )}
      </CardFooter>
    </Card>
  );
}
