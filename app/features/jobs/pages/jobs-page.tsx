import Hero from "~/common/components/hero";
import type { Route } from "./+types/jobs-page";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import { z } from "zod";
import { getServerClient } from "~/supa-client";

export function meta({ loaderData }: Route.ComponentProps) {
  return [
    { title: "Jobs | wemake" },
    {
      name: "description",
      content: "Find your dream job with wemake",
    },
  ];
}

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]])
    .optional(),
  location: z
    .enum(
      LOCATION_TYPES.map((locationType) => locationType.value) as [
        string,
        ...string[]
      ]
    )
    .optional(),
  salary: z.enum(SALARY_RANGES).optional(),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw new Response("Invalid search params", { status: 400 });
  }

  const { client } = getServerClient(request);

  const jobs = await getJobs(client, {
    limit: 10,
    type: parsedData.type,
    location: parsedData.location,
    salary: parsedData.salary,
  });

  return { jobs };
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const { jobs } = loaderData;
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
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id.toString()}
              companyName={job.company_name}
              companyLogoUrl={job.company_logo}
              companyLocation={job.company_location}
              title={job.position}
              postedAt={job.created_at}
              employmentType={job.job_type}
              locationType={job.location}
              salary={job.salary_range}
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
