import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"), // This one is the root route: "/"
  // All of the routes below will be prefixed with "/products"
  ...prefix("products", [
    index("features/products/pages/products-page.tsx"), // This one is the root route of the prefix: "/products"
    ...prefix("leaderboards", [
      index("features/products/pages/leaderboards-page.tsx"), // This one is the root route of the prefix: "/products/leaderboards"
      route(
        "/yearly/:year", // This one is a dynamic route: "/products/leaderboards/yearly/:year"
        "features/products/pages/leaderboards-yearly-page.tsx"
      ),
      route(
        "/monthly/:year/:month",
        "features/products/pages/leaderboards-monthly-page.tsx"
      ),
      route(
        "/weekly/:year/:week",
        "features/products/pages/leaderboards-weekly-page.tsx"
      ),
      route(
        "/daily/:year/:month/:day",
        "features/products/pages/leaderboards-daily-page.tsx"
      ),
      route(
        "/:period",
        "features/products/pages/leaderboards-redirection-page.tsx"
      ),
    ]),
    ...prefix("categories", [
      index("features/products/pages/categories-page.tsx"),
      route("/:category", "features/products/pages/category-page.tsx"),
    ]),
    route("/search", "features/products/pages/search-page.tsx"),
    route("/submit", "features/products/pages/submit-page.tsx"),
    route("/promote", "features/products/pages/promote-page.tsx"),
    ...prefix(":productId", [
      index("features/products/pages/product-redirection-page.tsx"),
      // layout is going to be rendered on top of all the routes below
      layout("features/products/layouts/product-overview-layout.tsx", [
        route("/overview", "features/products/pages/product-overview-page.tsx"),
        route("/reviews", "features/products/pages/product-reviews-page.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
