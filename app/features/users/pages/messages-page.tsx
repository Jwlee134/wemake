import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/messages-page";

export function meta({ matches }: Route.MetaArgs) {
  return [{ title: "Messages | wemake" }];
}

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl text-muted-foreground font-bold">
        Click on a message in the sidebar to start chatting
      </h1>
    </div>
  );
}
