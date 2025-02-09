import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Job Details | wemake` },
    { name: "description", content: "Job Details" },
  ];
}

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 items-start">
        <div className="col-span-4 space-y-10">
          <div>
            <div className="size-40 bg-white rounded-full overflow-hidden relative left-10">
              <img
                src="https://github.com/meta.png"
                className="size-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Software Engineer</h1>
              <h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Full-time</Badge>
            <Badge variant={"secondary"}>Remote</Badge>
            <Badge variant={"secondary"}>$100,000 - $150,000</Badge>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-muted-foreground">
              We are looking for a software engineer with 3 years of experience
              in React and Node.js. The ideal candidate will have a strong
              understanding of React and Node.js and will be able to work in a
              fast-paced environment.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {[
                "Develop and maintain web applications using React and Node.js",
                "Collaborate with cross-functional teams to define, design, and ship new features",
                "Implement and maintain efficient code that is easy to maintain and scale",
                "Integrate data storage solutions and improve data retrieval processes",
                "Write code that is clean, readable, and easy to maintain",
                "Participate in code reviews and provide feedback to other developers",
              ].map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in React and Node.js",
                "Strong understanding of React and Node.js",
                "Experience with modern web development tools and frameworks",
                "Excellent problem-solving skills",
                "Excellent communication skills",
                "Excellent teamwork skills",
              ].map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {[
                "Flexible working hours",
                "Remote work options",
                "Health insurance",
                "Dental insurance",
                "Vision insurance",
                "401(k) retirement savings plan",
              ].map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-muted-foreground list-disc list-inside">
              {[
                "React",
                "Node.js",
                "JavaScript",
                "TypeScript",
                "HTML",
                "CSS",
                "Git",
                "GitHub",
                "GitLab",
                "Docker",
                "Kubernetes",
                "AWS",
                "CI/CD",
                "Testing",
                "Agile",
                "Scrum",
              ].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-5 border rounded-lg mt-32 p-6 sticky top-20">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $150,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full-time</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              Posted 2 days ago
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
