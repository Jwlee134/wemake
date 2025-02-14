import type { Route } from "./+types/user-page";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Profile / wemake` },
    { name: "description", content: "User profile details" },
  ];
}

export default function UserPage() {
  return (
    <div className="max-w-screen-md flex flex-col space-y-10 *:space-y-2">
      <div>
        <h4 className="text-lg font-semibold">Headline</h4>
        <p className="text-muted-foreground">Product Designer at wemake</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Bio</h4>
        <p className="text-muted-foreground">
          I'm a product designer and I'm passionate about creating products that
          help people. I'm also a big fan of the web. I'm currently working as a
          product designer at wemake.
        </p>
      </div>
    </div>
  );
}
