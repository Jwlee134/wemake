import Hero from "~/common/components/hero";
import type { Route } from "./+types/post-submit-page";
import { Form, redirect, useNavigation } from "react-router";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { Button } from "~/common/components/ui/button";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getPostTopics } from "../queries";
import { z } from "zod";
import { createPost } from "../mutations";
import { Loader2Icon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Discussion | wemake" },
    {
      name: "description",
      content: "Create a new discussion to the community",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  await getLoggedInUserId(client);

  const topics = await getPostTopics(client);

  return { topics };
}

const formSchema = z.object({
  title: z.string().min(1).max(40),
  topic: z.string().min(1),
  content: z.string().min(1).max(1000),
});

export async function action({ request }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return { fieldErrors: error?.flatten().fieldErrors, verifyError: null };
  }

  const { title, topic, content } = data;

  const post = await createPost(client, { title, topic, content, userId });

  return redirect(`/community/${post.post_id}`);
}

export default function PostSubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { topics } = loaderData;
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="space-y-10">
      <Hero
        title="Submit Discussion"
        subtitle="Share your thoughts and ideas with the community"
      />
      <Form
        className="flex flex-col gap-10 max-w-screen-md mx-auto"
        method="post"
      >
        <div>
          <InputWithLabel
            id="title"
            label="Title"
            name="title"
            description="(40 characters or less)"
            required
            placeholder="e.g. What is the best way to learn React?"
          />
          {actionData?.fieldErrors?.title && (
            <p className="text-red-500 font-medium text-xs">
              {actionData.fieldErrors.title}
            </p>
          )}
        </div>
        <div>
          <SelectWithLabel
            label="Topic"
            name="topic"
            description="Select the topic of your discussion"
            required
            placeholder="e.g. React"
            options={topics.map((topic) => ({
              label: topic.name,
              value: topic.slug,
            }))}
          />
          {actionData?.fieldErrors?.topic && (
            <p className="text-red-500 font-medium text-xs">
              {actionData.fieldErrors.topic}
            </p>
          )}
        </div>
        <div>
          <InputWithLabel
            id="content"
            label="Content"
            name="content"
            textarea
            description="(1000 characters or less)"
            required
            placeholder="e.g. I'm having trouble understanding the concept of closures in JavaScript. Can someone help me?"
          />
          {actionData?.fieldErrors?.content && (
            <p className="text-red-500 font-medium text-xs">
              {actionData.fieldErrors.content}
            </p>
          )}
        </div>
        <Button type="submit" className="mx-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Create Discussion"
          )}
        </Button>
      </Form>
    </div>
  );
}
