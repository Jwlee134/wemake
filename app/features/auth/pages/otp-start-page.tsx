import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/otp-start-page";
import InputWithLabel from "~/common/components/input-with-label";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { getServerClient } from "~/supa-client";
import { LoaderCircleIcon } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enter OTP | wemake" },
    { name: "description", content: "Enter your one-time password" },
  ];
}

const formSchema = z.object({
  email: z.string().email(),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const { success, data } = formSchema.safeParse({
    email: formData.get("email"),
  });

  if (!success) {
    return { error: "Invalid email" };
  }

  const { email } = data;

  const { client } = getServerClient(request);

  const { error } = await client.auth.signInWithOtp({
    email,
  });

  if (error) {
    return { error: "Failed to send OTP" };
  }

  return redirect(`/auth/otp/complete?email=${email}`);
}

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center gap-10 flex-col w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send you a 4 digit code to log in to your account
          </p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputWithLabel
            id="email"
            label="Email"
            name="email"
            type="email"
            description="Enter your email"
            placeholder="e.g. john_doe@example.com"
            required
          />
          {actionData?.error && (
            <p className="text-red-500 text-xs font-medium">
              {actionData.error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}
