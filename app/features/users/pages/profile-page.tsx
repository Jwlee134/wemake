import { redirect } from "react-router";
import type { Route } from "./+types/profile-page";

export function loader({}: Route.LoaderArgs) {
  // find user by cookie
  return redirect("/users/jaewon");
}
