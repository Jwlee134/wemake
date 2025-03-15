import { redirect } from "react-router";
import type { Route } from "./+types/social-start-page";
import { z } from "zod";
import { getServerClient } from "~/supa-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Social Login | wemake" },
    { name: "description", content: "Login with your social account" },
  ];
}

const paramsSchema = z.object({
  provider: z.enum(["kakao", "github"]),
});

export async function loader({ params, request }: Route.LoaderArgs) {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    return redirect("/auth/login");
  }

  const { provider } = data;

  const { client, headers } = getServerClient(request);

  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider: data.provider,
    options: {
      redirectTo: new URL(
        `/auth/social/${provider}/complete`,
        request.url
      ).toString(),
    },
  });

  if (url) {
    return redirect(url, { headers });
  }

  if (error) {
    throw error;
  }
}
