import { Link } from "react-router";
import { Button } from "../components/ui/button";
import type { Route } from "./+types/home-page";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import TeamCard from "~/features/teams/components/team-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake!" },
  ];
}

export async function loader() {
  const [products, posts, gptIdeas, jobs] = await Promise.all([
    getProductsByDateRange({
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
    }),
    getPosts({ limit: 8 }),
    getGptIdeas({ limit: 8 }),
    getJobs({ limit: 11 }),
  ]);

  return { products, posts, gptIdeas, jobs };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products, posts, gptIdeas, jobs } = loaderData;

  return (
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products made by our community today.
          </p>
          <Button variant={"link"} asChild className="text-lg p-0">
            <Link to={"/products/leaderboards"}>
              Explore all products &rarr;
            </Link>
          </Button>
        </div>
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            reviewsCount={product.reviews}
            viewsCount={product.views}
            votesCount={product.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions from our community.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/community">Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            authorName={post.author_name}
            authorAvatarUrl={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            votesCount={post.upvotes}
          />
        ))}
      </div>{" "}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/ideas">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {gptIdeas.map((idea) => (
          <IdeaCard
            key={idea.idea_id}
            id={idea.idea_id.toString()}
            title={idea.idea}
            viewsCount={idea.views}
            postedAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest Jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find your dream job.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/jobs">Explore all jobs &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team looking for a new member.
          </p>
          <Button variant="link" asChild className="text-lg p-0">
            <Link to="/teams">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            key={index}
            id="teamId"
            leaderName="Jaewon"
            leaderAvatarUrl="https://github.com/jwlee134.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Project Manager",
            ]}
            projectDescription={"a new social media platform"}
          />
        ))}
      </div>
    </div>
  );
}
