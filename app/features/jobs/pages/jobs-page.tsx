import Hero from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export function meta({ loaderData }: Route.ComponentProps) {
  return [
    { title: "Jobs | wemake" },
    {
      name: "description",
      content: "Find your dream job with wemake",
    },
  ];
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilterChange(key: string, value: string) {
    if (searchParams.has(key)) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <div className="space-y-10">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-3 col-span-4 gap-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <JobCard
              key={index}
              id="jobId"
              companyName="Tesla"
              companyLogoUrl="https://github.com/facebook.png"
              companyLocation="San Francisco, CA"
              title="Software Engineer"
              postedAt="12 hours ago"
              employmentType="Full-time"
              locationType="Remote"
              salaryMin={100000}
              salaryMax={120000}
            />
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-10 sticky top-20">
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((jobType) => (
                <Button
                  variant={"outline"}
                  key={jobType.value}
                  onClick={() => handleFilterChange("type", jobType.value)}
                  className={cn(
                    searchParams.get("type") === jobType.value && "bg-accent"
                  )}
                >
                  {jobType.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-sm text-muted-foreground font-bold">
              Location
            </h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((locationType) => (
                <Button
                  variant={"outline"}
                  key={locationType.value}
                  onClick={() =>
                    handleFilterChange("location", locationType.value)
                  }
                  className={cn(
                    searchParams.get("location") === locationType.value &&
                      "bg-accent"
                  )}
                >
                  {locationType.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h4 className="text-sm text-muted-foreground font-bold">Salary</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGES.map((salaryRange) => (
                <Button
                  variant={"outline"}
                  key={salaryRange}
                  onClick={() => handleFilterChange("salary", salaryRange)}
                  className={cn(
                    searchParams.get("salary") === salaryRange && "bg-accent"
                  )}
                >
                  {salaryRange}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
