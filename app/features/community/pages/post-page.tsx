import type { Route } from "./+types/post-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Post | wemake" },
    { name: "description", content: "View community post" },
  ];
}

export default function PostPage({ params }: Route.ComponentProps) {
  const { postId } = params;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Post {postId}</h1>
      {/* Add your post page content here */}
    </div>
  );
}
