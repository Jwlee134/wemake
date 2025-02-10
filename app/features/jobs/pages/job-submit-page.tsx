import Hero from "~/common/components/hero";
import type { Route } from "./+types/job-submit-page";
import { Form } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import SelectWithLabel from "~/common/components/select-with-label";
import { Button } from "~/common/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Post a Job | wemake" },
    {
      name: "description",
      content: "Reach out to the best developers in the world",
    },
  ];
}

export default function JobSubmitPage({}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title="Post a Job"
        subtitle="Reach out to the best developers in the world"
      />
      <Form className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center">
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
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
