import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { DateTime } from "luxon";

interface JobCardProps {
  id: string;
  companyName: string;
  companyLogoUrl: string;
  title: string;
  postedAt: string;
  employmentType: string;
  locationType: string;
  salary: string;
  companyLocation: string;
}

export function JobCard({
  id,
  companyName,
  companyLogoUrl,
  title,
  postedAt,
  employmentType,
  locationType,
  salary,
  companyLocation,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={companyLogoUrl}
              alt={`${companyName} Logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="text-accent-foreground">{companyName}</span>
              <span className="text-sm text-muted-foreground">
                {DateTime.fromISO(postedAt).toRelative()}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Badge variant="outline" className="capitalize">
            {employmentType}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {locationType}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {companyLocation}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
