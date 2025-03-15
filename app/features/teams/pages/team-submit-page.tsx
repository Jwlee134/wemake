import Hero from "~/common/components/hero";
import type { Route } from "./+types/team-submit-page";
import { Form, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { PRODUCT_STAGES } from "../constants";
import { getLoggedInUserId } from "~/features/users/queries";
import { getServerClient } from "~/supa-client";
import { z } from "zod";
import { createTeam } from "../mutations";
import { LoaderCircleIcon } from "lucide-react";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Submit Team | wemake" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  await getLoggedInUserId(client);
}

const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.enum(
    PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]
  ),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
});

export type TeamSubmitFormData = z.infer<typeof formSchema>;

export async function action({ request }: Route.ActionArgs) {
  const { client } = getServerClient(request);

  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const result = formSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const { team_id } = await createTeam({
    client,
    userId,
    formData: result.data,
  });

  return redirect(`/teams/${team_id}`);
}

export default function TeamSubmitPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="space-y-10">
      <Hero title="Submit Team" subtitle="Submit a team to the community." />
      <Form
        className="max-w-screen-xl mx-auto flex flex-col gap-10 items-center"
        method="post"
      >
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputWithLabel
            label="What is the name of your product?"
            name="name"
            placeholder="e.g. My Startup"
            maxLength={20}
            required
            id="name"
            description="(20 characters max)"
          />
          {actionData?.fieldErrors?.name && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.name}
            </p>
          )}
          <SelectWithLabel
            label="What is the stage of your product?"
            name="stage"
            options={PRODUCT_STAGES}
            required
            placeholder="Select product stage"
            description="Select the stage of your product"
          />
          {actionData?.fieldErrors?.stage && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.stage}
            </p>
          )}
          <InputWithLabel
            label="What is the size of your team?"
            name="size"
            placeholder="Enter team size"
            maxLength={100}
            minLength={1}
            required
            id="size"
            description="(1-100)"
          />
          {actionData?.fieldErrors?.size && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.size}
            </p>
          )}
          <InputWithLabel
            label="How much equity are you willing to offer?"
            name="equity"
            placeholder="Enter equity"
            maxLength={100}
            required
            id="equity"
            description="(*each)"
          />
          {actionData?.fieldErrors?.equity && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.equity}
            </p>
          )}
          <InputWithLabel
            label="What roles are you looking for?"
            name="roles"
            placeholder="e.g. React Developer, Backend Developer"
            maxLength={100}
            required
            id="roles"
            description="(comma separated)"
          />
          {actionData?.fieldErrors?.roles && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.roles}
            </p>
          )}
          <InputWithLabel
            label="What is the description of your product?"
            name="description"
            placeholder="e.g. We are a team of 3 people looking for a React Developer and a Backend Developer to build a social media platform."
            maxLength={200}
            required
            id="description"
            description="(200 characters max)"
            textarea
          />
          {actionData?.fieldErrors?.description && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.description}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full max-w-sm"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircleIcon className="w-4 h-4 mr-2" />
          ) : (
            "Submit team"
          )}
        </Button>
      </Form>
    </div>
  );
}
