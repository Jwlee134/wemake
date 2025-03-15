import { redirect } from "react-router";
import type { Route } from "./+types/social-complete-page";
import { z } from "zod";
import { getServerClient } from "~/supa-client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Complete Social Login | wemake" },
    { name: "description", content: "Complete your social login" },
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

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirect("/auth/login");
  }

  const { client, headers } = getServerClient(request);

  const { error } = await client.auth.exchangeCodeForSession(code);

  if (error) {
    throw error;
  }

  return redirect("/", { headers });
}
