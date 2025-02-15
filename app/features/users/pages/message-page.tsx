import type { Route } from "./+types/message-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Message | wemake" }];
}

export default function MessagePage() {
  return <div>Message Page</div>;
}
