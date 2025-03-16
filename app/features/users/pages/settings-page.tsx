import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/settings-page";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Settings | wemake" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, userId);

  return { user };
}

const formSchema = z.object({
  name: z.string().min(1),
  role: z.enum([
    "developer",
    "designer",
    "marketer",
    "founder",
    "product-manager",
  ]),
  bio: z.string().optional().default(""),
  headline: z.string().optional().default(""),
});

export async function action({ request }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();

  const avatar = formData.get("avatar");

  if (avatar && avatar instanceof File) {
    if (avatar.size <= 1_048_576 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
        });

      if (error) {
        return { fieldErrors: { avatar: "Failed to upload avatar" } };
      }

      const {
        data: { publicUrl },
      } = client.storage.from("avatars").getPublicUrl(data.path);

      await updateUserAvatar(client, userId, publicUrl);

      return { fieldErrors: null };
    } else {
      return { fieldErrors: { avatar: "Invalid file size or format" } };
    }
  } else {
    const result = formSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return { fieldErrors: result.error.flatten().fieldErrors };
    }

    const { name, role, bio, headline } = result.data;

    await updateUser(client, userId, { name, role, bio, headline });

    return { fieldErrors: null };
  }
}

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { user } = loaderData;
  const [avatar, setAvatar] = useState<string | null>(
    loaderData.user.avatar ?? null
  );
  const navigation = useNavigation();
  const isUpdateProfileSubmitting =
    navigation.state === "submitting" &&
    Boolean(navigation.formData?.get("name"));
  const isUpdateAvatarSubmitting =
    navigation.state === "submitting" &&
    Boolean(navigation.formData?.get("avatar"));

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          {actionData?.fieldErrors !== undefined &&
            actionData.fieldErrors === null && (
              <Alert className="w-1/2">
                <CheckCircle2Icon className="size-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Your profile has been updated successfully.
                </AlertDescription>
              </Alert>
            )}
          <Form className="flex flex-col w-1/2 gap-5" method="post">
            <InputWithLabel
              label="Name"
              name="name"
              id="name"
              description="Your name will be displayed to other users."
              required
              placeholder="e.g. John Doe"
              defaultValue={user.name}
            />
            {actionData?.fieldErrors && "name" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.name}
              </small>
            )}
            <SelectWithLabel
              label="Role"
              name="role"
              description="Your role will be displayed to other users."
              required
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Marketer", value: "marketer" },
                { label: "Founder", value: "founder" },
                { label: "Product Manager", value: "product-manager" },
              ]}
              placeholder="Select your role"
              defaultValue={user.role}
            />
            {actionData?.fieldErrors && "role" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.role}
              </small>
            )}
            <InputWithLabel
              label="Bio"
              name="bio"
              id="bio"
              description="Your bio will be displayed to other users."
              placeholder="e.g. I'm a software engineer at Google. I'm passionate about creating products that help people. I'm also a big fan of the web."
              textarea
              defaultValue={user.bio ?? ""}
            />
            {actionData?.fieldErrors && "bio" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.bio}
              </small>
            )}
            <InputWithLabel
              label="Headline"
              name="headline"
              id="headline"
              description="Your headline will be displayed to other users."
              placeholder="e.g. Product Designer at wemake"
              defaultValue={user.headline ?? ""}
            />
            {actionData?.fieldErrors &&
              "headline" in actionData.fieldErrors && (
                <small className="text-red-500">
                  {actionData.fieldErrors.headline}
                </small>
              )}
            <Button
              type="submit"
              className="w-full"
              disabled={isUpdateProfileSubmitting}
            >
              {isUpdateProfileSubmitting ? "Updating..." : "Update"}
            </Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-6 rounded-lg border shadow-md space-y-5 h-fit"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-0.5">
            Avatar
            <small className="text-muted-foreground">
              This is the avatar of your profile.
            </small>
          </Label>
          <div className="flex flex-col gap-5">
            <div className="size-40 rounded-full shadow-md overflow-hidden">
              {avatar && (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="size-full object-cover"
                />
              )}
            </div>
            <Input
              name="avatar"
              type="file"
              className="w-1/2"
              onChange={handleFileChange}
              required
            />
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>Recommended size: 128x128px</span>
              <span>Allowed format: PNG, JPEG</span>
              <span>Maximum size: 1MB</span>
            </div>
            {actionData?.fieldErrors && "avatar" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.avatar}
              </small>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isUpdateAvatarSubmitting}
            >
              {isUpdateAvatarSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
