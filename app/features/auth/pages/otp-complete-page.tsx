import InputWithLabel from "~/common/components/input-with-label";
import type { Route } from "./+types/otp-complete-page";
import { Form, redirect, useSearchParams, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { getServerClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify OTP | wemake" },
    { name: "description", content: "Verify your one-time password" },
  ];
}

const formSchema = z.object({
  otp: z.string().length(6),
  email: z.string().email(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const {
    success,
    data,
    error: formError,
  } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return { fieldErrors: formError?.flatten().fieldErrors, verifyError: null };
  }

  const { client, headers } = getServerClient(request);

  const { error } = await client.auth.verifyOtp({
    email: data.email,
    token: data.otp,
    type: "email",
  });

  if (error) {
    return { verifyError: error.message, fieldErrors: null };
  }

  return redirect("/", { headers });
}

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();

  const email = searchParams.get("email");

  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the 4 digit code we sent you
          </p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <input type="hidden" name="email" value={email ?? ""} />
          <InputWithLabel
            id="otp"
            label="OTP"
            name="otp"
            type="number"
            description="Enter the 6 digit code we sent you"
            placeholder="e.g. 123456"
            required
          />
          {actionData?.fieldErrors?.otp && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.fieldErrors.otp[0]}
            </p>
          )}
          {actionData?.verifyError && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.verifyError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
