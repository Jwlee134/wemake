import { redirect } from "react-router";

// You don't have to return a JSX in the page component.
// You can return a redirect or even a json response.

export function loader() {
  return redirect("/products/leaderboards");
}
