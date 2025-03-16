import { Form, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/product-submit-page";
import Hero from "~/common/components/hero";
import InputWithLabel from "~/common/components/input-with-label";
import SelectWithLabel from "~/common/components/select-with-label";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { getServerClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { getProductCategories } from "../queries";
import { createProduct } from "../mutations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit your product" },
  ];
}

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1).max(60),
  url: z.string().min(1).url(),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= 1_048_576, {
      message: "Icon must be less than 1MB",
    })
    .refine((file) => file.type === "image/png" || file.type === "image/jpeg", {
      message: "Icon must be a PNG or JPEG image",
    }),
});

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);
  await getLoggedInUserId(client);

  const data = await getProductCategories(client);

  return { categories: data };
}

export async function action({ request }: Route.ActionArgs) {
  const { client } = getServerClient(request);
  const userId = await getLoggedInUserId(client);

  const formData = await request.formData();
  const result = formSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const { icon, ...rest } = result.data;

  const { data: iconData, error } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
    });

  if (error) {
    return { fieldErrors: { icon: error.message } };
  }

  const {
    data: { publicUrl },
  } = client.storage.from("icons").getPublicUrl(iconData.path);

  const product = await createProduct(client, {
    userId,
    name: rest.name,
    tagline: rest.tagline,
    url: rest.url,
    description: rest.description,
    category: rest.category,
    icon: publicUrl,
    howItWorks: rest.howItWorks,
  });

  return redirect(`/products/${product.product_id}`);
}

export default function ProductSubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { categories } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [icon, setIcon] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your creation with the world"
      />
      <Form
        className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
        method="post"
        encType="multipart/form-data"
      >
        <div className="space-y-5">
          <InputWithLabel
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            required
            type="text"
            placeholder="Name of your product"
          />
          {actionData?.fieldErrors && "name" in actionData.fieldErrors && (
            <small className="text-red-500">
              {actionData.fieldErrors.name?.join(", ")}
            </small>
          )}
          <InputWithLabel
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise tagline for your product"
          />
          {actionData?.fieldErrors && "tagline" in actionData.fieldErrors && (
            <small className="text-red-500">
              {actionData.fieldErrors.tagline?.join(", ")}
            </small>
          )}
          <InputWithLabel
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          {actionData?.fieldErrors && "url" in actionData.fieldErrors && (
            <small className="text-red-500">
              {actionData.fieldErrors.url?.join(", ")}
            </small>
          )}
          <InputWithLabel
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your product"
            textarea
          />
          {actionData?.fieldErrors &&
            "description" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.description?.join(", ")}
              </small>
            )}
          <InputWithLabel
            label="How it works"
            description="A detailed description of how your product works"
            id="how-it-works"
            name="howItWorks"
            required
            type="text"
            placeholder="A detailed description of how your product works"
            textarea
          />
          {actionData?.fieldErrors &&
            "howItWorks" in actionData.fieldErrors && (
              <small className="text-red-500">
                {actionData.fieldErrors.howItWorks?.join(", ")}
              </small>
            )}
          <SelectWithLabel
            name="category"
            label="Category"
            description="The category of your product"
            placeholder="Select a category"
            options={categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData?.fieldErrors && "category" in actionData.fieldErrors && (
            <small className="text-red-500">
              {actionData.fieldErrors.category?.join(", ")}
            </small>
          )}
          <Button
            type="submit"
            className="w-full"
            size={"lg"}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="size-40 rounded-xl shadow-md overflow-hidden">
            {icon && (
              <img src={icon} alt="Icon" className="size-full object-cover" />
            )}
          </div>
          <Label className="flex flex-col gap-0.5">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product.
            </small>
          </Label>
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
          {actionData?.fieldErrors && "icon" in actionData.fieldErrors && (
            <small className="text-red-500">
              {actionData.fieldErrors.icon}
            </small>
          )}
        </div>
      </Form>
    </div>
  );
}
