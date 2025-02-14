import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Settings | wemake" }];
}

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);

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
          <Form className="flex flex-col w-1/2 gap-5">
            <InputWithLabel
              label="Name"
              name="name"
              id="name"
              description="Your name will be displayed to other users."
              required
              placeholder="e.g. John Doe"
            />
            <SelectWithLabel
              label="Role"
              name="role"
              description="Your role will be displayed to other users."
              required
              options={[
                { label: "Software Engineer", value: "software_engineer" },
                { label: "Product Manager", value: "product_manager" },
                { label: "Designer", value: "designer" },
                { label: "Other", value: "other" },
              ]}
              placeholder="Select your role"
            />
            <InputWithLabel
              label="Bio"
              name="bio"
              id="bio"
              description="Your bio will be displayed to other users."
              required
              placeholder="e.g. I'm a software engineer at Google."
              textarea
            />
            <Button type="submit" className="w-full">
              Update
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md space-y-5">
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
              name="icon"
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
            <Button type="submit" className="w-full">
              Update
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
