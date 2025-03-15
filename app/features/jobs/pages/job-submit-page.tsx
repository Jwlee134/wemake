import Hero from "~/common/components/hero";
import type { Route } from "./+types/job-submit-page";
import { Form } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import SelectWithLabel from "~/common/components/select-with-label";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { getServerClient } from "~/supa-client";
import { z } from "zod";
import { createJob } from "../mutations";
import { redirect, useNavigation } from "react-router";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Post a Job | wemake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  await getLoggedInUserId(client);
}

const formSchema = z.object({
  position: z.string().min(1).max(40),
  overview: z.string().min(1).max(400),
  responsibilities: z.string().min(1).max(400),
  qualifications: z.string().min(1).max(400),
  benefits: z.string().min(1).max(400),
  skills: z.string().min(1).max(400),
  companyName: z.string().min(1).max(40),
  companyLogoUrl: z.string().min(1).max(40),
  companyLocation: z.string().min(1).max(40),
  applyUrl: z.string().min(1).max(40),
  jobType: z.enum(
    JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]
  ),
  jobLocation: z.enum(
    LOCATION_TYPES.map((locationType) => locationType.value) as [
      string,
      ...string[]
    ]
  ),
  salaryRange: z.enum(SALARY_RANGES),
});

export type JobSubmitFormData = z.infer<typeof formSchema>;

export async function action({ request }: Route.ActionArgs) {
  const { client } = getServerClient(request);

  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }

  const { job_id } = await createJob(client, data);

  return redirect(`/jobs/${job_id}`);
}

export default function JobSubmitPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="space-y-10">
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form
        className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center"
        method="post"
      >
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputWithLabel
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Senior React Developer"
          />
          {actionData?.fieldErrors?.position && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.position}
            </p>
          )}
          <InputWithLabel
            id="overview"
            label="Overview"
            textarea
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. We are looking for a senior react developer with 3+ years of experience"
          />
          {actionData?.fieldErrors?.overview && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.overview}
            </p>
          )}
          <InputWithLabel
            id="responsibilities"
            label="Responsibilities"
            textarea
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Implement new features, refactor code, write tests"
          />
          {actionData?.fieldErrors?.responsibilities && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.responsibilities}
            </p>
          )}
          <InputWithLabel
            id="qualifications"
            label="Qualifications"
            textarea
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Bachelor's degree in Computer Science, 3+ years of experience"
          />
          {actionData?.fieldErrors?.qualifications && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.qualifications}
            </p>
          )}
          <InputWithLabel
            id="benefits"
            label="Benefits"
            textarea
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. Health insurance, 401(k), vacation"
          />
          {actionData?.fieldErrors?.benefits && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.benefits}
            </p>
          )}
          <InputWithLabel
            id="skills"
            label="Skills"
            textarea
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="e.g. React, TypeScript, Node.js"
          />
          {actionData?.fieldErrors?.skills && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.skills}
            </p>
          )}
          <InputWithLabel
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. Tesla"
          />
          {actionData?.fieldErrors?.companyName && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.companyName}
            </p>
          )}
          <InputWithLabel
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            maxLength={40}
            type="url"
            required
            placeholder="e.g. https://example.com/logo.png"
          />
          {actionData?.fieldErrors?.companyLogoUrl && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.companyLogoUrl}
            </p>
          )}
          <InputWithLabel
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="e.g. San Francisco, CA"
          />
          {actionData?.fieldErrors?.companyLocation && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.companyLocation}
            </p>
          )}
          <InputWithLabel
            id="applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="e.g. https://example.com/apply"
          />
          {actionData?.fieldErrors?.applyUrl && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.applyUrl}
            </p>
          )}
          <SelectWithLabel
            label="Job Type"
            name="jobType"
            required
            description="Select the job type"
            placeholder="Select the job type"
            options={JOB_TYPES.map((jobType) => ({
              label: jobType.label,
              value: jobType.value,
            }))}
          />
          {actionData?.fieldErrors?.jobType && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.jobType}
            </p>
          )}
          <SelectWithLabel
            label="Job Location"
            name="jobLocation"
            required
            description="Select the job location"
            placeholder="Select the job location"
            options={LOCATION_TYPES.map((locationType) => ({
              label: locationType.label,
              value: locationType.value,
            }))}
          />
          {actionData?.fieldErrors?.jobLocation && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.jobLocation}
            </p>
          )}
          <SelectWithLabel
            label="Salary Range"
            name="salaryRange"
            required
            description="Select the salary range"
            placeholder="Select the salary range"
            options={SALARY_RANGES.map((salaryRange) => ({
              label: salaryRange,
              value: salaryRange,
            }))}
          />
          {actionData?.fieldErrors?.salaryRange && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.salaryRange}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full max-w-sm"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            "Post job for $100"
          )}
        </Button>
      </Form>
    </div>
  );
}
