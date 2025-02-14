import type { Route } from "./+types/user-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "User" }];
}

export default function UserPage() {
  return <div>User Page</div>;
}
