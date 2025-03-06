import { useOutletContext } from "react-router";
import type { Route } from "./+types/user-page";
import client from "~/supa-client";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `User Profile / wemake` },
    { name: "description", content: "User profile details" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username,
    },
  });
  return null;
}

export default function UserPage() {
  const { headline, bio } = useOutletContext<{
    headline: string;
    bio: string;
  }>();

  return (
    <div className="max-w-screen-md flex flex-col space-y-10 *:space-y-2">
      <div>
        <h4 className="text-lg font-semibold">Headline</h4>
        <p className="text-muted-foreground">{headline}</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold">Bio</h4>
        <p className="text-muted-foreground">{bio}</p>
      </div>
    </div>
  );
}
