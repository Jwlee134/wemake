import type { Route } from "./+types/messages-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Messages" }];
}

export default function MessagesPage() {
  return <div>Messages Page</div>;
}
