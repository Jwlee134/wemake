import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/user-posts-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Posts / wemake` },
    { name: "description", content: "Posts created by user" },
  ];
}

export default function UserPostsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <PostCard
          key={index}
          id={index}
          title="What is the best way to learn React?"
          authorName="Jaewon"
          authorAvatarUrl="https://github.com/apple.png"
          category="React"
          postedAt="12 hours ago"
          expanded
        />
      ))}
    </div>
  );
}
