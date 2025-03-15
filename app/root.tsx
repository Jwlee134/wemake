import { Settings } from "luxon";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigation,
} from "react-router";

import "./app.css";
import type { Route } from "./+types/root";
import Navigation from "./common/components/navigation";
import { cn } from "./lib/utils";
import { getServerClient } from "~/supa-client";
import { getUserById } from "~/features/users/queries";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  Settings.defaultLocale = "ko";
  Settings.defaultZone = "Asia/Seoul";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="max-w-screen-2xl mx-auto">{children}</main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = getServerClient(request);

  const {
    data: { user },
  } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, user.id);

    return { user, profile };
  }

  return { user: null, profile: null };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { user, profile } = loaderData;

  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isLoggedIn = !!user;

  return (
    <div
      className={cn({
        "py-28 px-5 md:px-20": !pathname.includes("/auth/"),
        "transition-opacity animate-pulse": isLoading,
      })}
    >
      {pathname.includes("/auth/") ? null : (
        <Navigation
          isLoggedIn={isLoggedIn}
          hasMessages={true}
          hasNotifications={true}
          username={profile?.username}
          name={profile?.name}
          avatar={profile?.avatar}
        />
      )}
      <Outlet
        context={{
          isLoggedIn,
          username: profile?.username ?? null,
          avatar: profile?.avatar ?? null,
        }}
      />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
