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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake!" },
  ];
}

export async function loader() {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
  });

  const posts = await getPosts({ limit: 8 });

  return { products, posts };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products, posts } = loaderData;

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
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id="ideaId"
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on your goals and preferences using a movile app to help you lose weight faster."
            viewsCount={123}
            postedAt="12 hours ago"
            likesCount={12}
            claimed={index % 2 === 0}
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
