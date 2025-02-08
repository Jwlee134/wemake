import { Link } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface TeamCardProps {
  id: string;
  leaderName: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export default function TeamCard({
  id,
  leaderName,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-sm leading-loose space-x-1">
            <Badge
              variant={"secondary"}
              className="inline-flex shadow-sm items-center text-sm gap-1"
            >
              <span>@{leaderName}</span>
              <Avatar className="size-5">
                <AvatarFallback>N</AvatarFallback>
                <AvatarImage src={leaderAvatarUrl} />
              </Avatar>
            </Badge>
            <span>is looking for</span>
            {positions.map((position) => (
              <Badge key={position} className="text-sm">
                {position}
              </Badge>
            ))}
            <span>to build</span>
            <span>{projectDescription}.</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant={"link"}>Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
