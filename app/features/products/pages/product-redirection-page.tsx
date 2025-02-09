import { redirect } from "react-router";
import type { Route } from "./+types/product-redirection-page";

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;

  return redirect(`/products/${productId}/overview`);
}
