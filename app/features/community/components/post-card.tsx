import { Link, useFetcher } from "react-router";
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
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
  id: number;
  title: string;
  authorName: string;
  authorAvatarUrl: string | null;
  category: string;
  postedAt: string;
  expanded?: boolean;
  votesCount?: number;
  isUpvoted?: boolean;
}

export function PostCard({
  id,
  title,
  authorName,
  authorAvatarUrl,
  category,
  postedAt,
  expanded = false,
  votesCount = 0,
  isUpvoted = false,
}: PostCardProps) {
  const fetcher = useFetcher();
  const optimisticVotesCount =
    fetcher.state === "idle"
      ? votesCount
      : isUpvoted
      ? votesCount - 1
      : votesCount + 1;
  const optimisticIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;

  function onUpvoteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (fetcher.state !== "idle") return;
    fetcher.submit(
      { id },
      { method: "post", action: `/community/${id}/upvote` }
    );
  }

  return (
    <Link to={`/community/${id}`} className="block">
      <Card
        className={cn([
          "flex bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex-row items-center justify-between" : "flex-col",
        ])}
      >
        <CardHeader className="flex flex-row items-center gap-2">
          <Avatar className="size-14">
            <AvatarFallback>{authorName.slice(0, 1)}</AvatarFallback>
            {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
          </Avatar>
          <div className="space-y-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2 text-xs leading-tight text-muted-foreground">
              <span>{authorName} on</span>
              <span>{category}</span>
              <DotIcon className="size-4" />
              <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link">Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pb-0">
            <Button
              variant={"outline"}
              className={cn(
                "flex flex-col h-14",
                optimisticIsUpvoted ? "border-primary text-primary" : ""
              )}
              onClick={onUpvoteClick}
            >
              <ChevronUpIcon />
              <span>{optimisticVotesCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
