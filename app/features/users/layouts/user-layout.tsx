import { Form, Link, NavLink, Outlet, useOutletContext } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/user-layout";
import { getUserProfile } from "../queries";
import { getServerClient } from "~/supa-client";

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const user = await getUserProfile(client, params.username!);

  return { user };
}

export default function UserLayout({ loaderData }: Route.ComponentProps) {
  const { isLoggedIn, username } = useOutletContext<{
    isLoggedIn: boolean;
    username: string | null;
  }>();
  const { user } = loaderData;

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          <AvatarImage src={user.avatar ?? ""} />
          <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">{user.username}</h1>
            {isLoggedIn && username === user.username ? (
              <Button variant="outline" asChild>
                <Link to="/my/settings">Edit Profile</Link>
              </Button>
            ) : null}
            {isLoggedIn && username !== user.username ? (
              <Button variant="secondary">Follow</Button>
            ) : null}
            {isLoggedIn && username !== user.username ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Message</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="space-y-4">
                    <span className="text-muted-foreground">
                      Send a message to {user.username}
                    </span>
                    <Form className="space-y-4">
                      <Textarea
                        placeholder="Message"
                        className="resize-none"
                        rows={4}
                      />
                      <Button type="submit">Send</Button>
                    </Form>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              {user.username}
            </span>
            <Badge variant="secondary" className="capitalize">
              {user.role}
            </Badge>
            <Badge variant="secondary">{user.followers} followers</Badge>
            <Badge variant="secondary">{user.following} following</Badge>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        {[
          { label: "About", href: `/users/${user.username}` },
          { label: "Products", href: `/users/${user.username}/products` },
          { label: "Posts", href: `/users/${user.username}/posts` },
        ].map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive ? "bg-accent text-accent-foreground" : ""
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet context={{ headline: user.headline, bio: user.bio }} />
      </div>
    </div>
  );
}
