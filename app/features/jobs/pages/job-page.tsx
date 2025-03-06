import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getJobById } from "../queries";
import { z } from "zod";
import { DateTime } from "luxon";
import { getServerClient } from "~/supa-client";

export function meta({ data: { job } }: Route.MetaArgs) {
  return [
    { title: `${job.position} | wemake` },
    { name: "description", content: job.overview },
  ];
}

const paramsSchema = z.object({
  jobId: z.coerce.number(),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Response("Not Found", { status: 404 });
  }

  const { client } = getServerClient(request);

  const job = await getJobById(client, data.jobId);

  return { job };
}

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const { job } = loaderData;

  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 items-start">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
              <img
                src={job.company_logo}
                className="size-full object-cover"
                alt={job.company_name}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{job.position}</h1>
              <h4 className="text-lg text-muted-foreground">
                {job.company_name}
              </h4>
            </div>
          </div>
          <div className="flex gap-2 capitalize">
            <Badge variant={"secondary"}>{job.job_type}</Badge>
            <Badge variant={"secondary"}>{job.location}</Badge>
            <Badge variant={"secondary"}>{job.salary_range}</Badge>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-muted-foreground">{job.overview}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {job.responsibilities.split(",").map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {job.qualifications.split(",").map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {job.benefits.split(",").map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {job.skills.split(",").map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-5 border rounded-lg mt-32 p-6 sticky top-20">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">{job.salary_range}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium capitalize">
              {job.job_type}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium capitalize">
              {job.location}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              Posted {DateTime.fromISO(job.created_at).toRelative()}
            </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">1000 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
