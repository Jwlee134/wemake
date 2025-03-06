import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/user-posts-page";
import { getUserPosts } from "../queries";
export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Posts / wemake` },
    { name: "description", content: "Posts created by user" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const posts = await getUserPosts(params.username!);

  return { posts };
}

export default function UserPostsPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard
          key={post.post_id}
          id={post.post_id}
          title={post.title}
          authorName={post.author_name}
          authorAvatarUrl={post.author_avatar}
          category={post.topic}
          postedAt={post.created_at}
          expanded
        />
      ))}
    </div>
  );
}
