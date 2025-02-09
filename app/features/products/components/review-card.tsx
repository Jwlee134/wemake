import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface ReviewCardProps {
  avatarUrl: string;
  authorName: string;
  username: string;
  rating: number;
  content: string;
  timestamp: string;
}

export function ReviewCard({
  avatarUrl,
  authorName,
  username,
  rating,
  content,
  timestamp,
}: ReviewCardProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold">{authorName}</h3>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      <div className="flex">
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon
            key={index}
            className="size-4 text-yellow-500"
            fill="currentColor"
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{content}</p>
      <span className="text-xs text-muted-foreground">{timestamp}</span>
    </div>
  );
}
