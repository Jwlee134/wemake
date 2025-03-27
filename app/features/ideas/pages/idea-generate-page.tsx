import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { insertIdeas } from "../mutations";
import { adminClient } from "~/supa-client";
import type { Route } from "./+types/idea-generate-page";

const openai = new OpenAI();

const ideaSchema = z.object({
  title: z.string(),
  description: z.string({
    description: "A short description of the idea. 100 characters max.",
  }),
  problem: z.string(),
  solution: z.string(),
  category: z.enum([
    "health",
    "education",
    "finance",
    "entertainment",
    "other",
  ]),
});

const responseSchema = z.object({
  ideas: z.array(ideaSchema),
});

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-POTATO");

  if (!header || header !== "X-TOMATO") {
    return new Response(null, { status: 404 });
  }

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "Give an idea for a startup that can be built by one person",
      },
      {
        role: "user",
        content:
          "For example: 'A startup that helps people learn to code' or 'A startup that helps people lose weight'",
      },
      {
        role: "user",
        content: "Generate 10 ideas",
      },
    ],
    response_format: zodResponseFormat(responseSchema, "ideas"),
  });

  const descriptions = completion.choices[0].message.parsed?.ideas.map(
    (idea) => idea.description
  );

  if (!descriptions) {
    return Response.json({ error: "No ideas generated" }, { status: 400 });
  }

  await insertIdeas(adminClient, descriptions);

  return Response.json({ success: true });
}
