import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
  id: string;
  title: string;
  viewsCount?: number;
  postedAt?: string;
  likesCount?: number;
  claimed?: boolean;
  isOwned?: boolean;
}

export function IdeaCard({
  id,
  title,
  viewsCount,
  postedAt,
  likesCount,
  claimed,
  isOwned,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={claimed ? "" : `/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground break-all"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      {isOwned ? null : (
        <CardContent className="flex items-center text-sm">
          {viewsCount !== undefined ? (
            <div className="flex items-center gap-1">
              <EyeIcon className="size-4" />
              <span>{viewsCount}</span>
            </div>
          ) : null}
          {viewsCount !== undefined && postedAt !== undefined ? (
            <DotIcon className="size-4" />
          ) : null}
          {postedAt ? (
            <span>{DateTime.fromISO(postedAt).toRelative()}</span>
          ) : null}
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {!claimed && !isOwned ? (
          <Button variant="outline" className="flex items-center">
            <HeartIcon className="size-4" />
            {likesCount !== undefined ? <span>{likesCount}</span> : null}
          </Button>
        ) : null}
        {!claimed && !isOwned ? (
          <Button asChild>
            <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
          </Button>
        ) : (
          <Button variant={"outline"} disabled className="flex items-center">
            <LockIcon className="size-4" />
            <span>Claimed</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
