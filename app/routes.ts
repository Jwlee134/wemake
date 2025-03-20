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
    layout("features/products/layouts/leaderboard-layout.tsx", [
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
    ]),

    ...prefix("categories", [
      index("features/products/pages/categories-page.tsx"),
      route("/:categoryId", "features/products/pages/category-page.tsx"),
    ]),
    route("/search", "features/products/pages/search-page.tsx"),
    route("/submit", "features/products/pages/product-submit-page.tsx"),
    route("/promote", "features/products/pages/promote-page.tsx"),
    ...prefix(":productId", [
      index("features/products/pages/product-redirection-page.tsx"),
      // layout is going to be rendered on top of all the routes below
      layout("features/products/layouts/product-overview-layout.tsx", [
        route("/overview", "features/products/pages/product-overview-page.tsx"),
        route("/reviews", "features/products/pages/product-reviews-page.tsx"),
      ]),
      route("/visit", "features/products/pages/product-visit-page.tsx"),
    ]),
  ]),

  ...prefix("ideas", [
    index("features/ideas/pages/ideas-page.tsx"),
    route("/:ideaId", "features/ideas/pages/idea-page.tsx"),
  ]),

  ...prefix("jobs", [
    index("features/jobs/pages/jobs-page.tsx"),
    route("/submit", "features/jobs/pages/job-submit-page.tsx"),
    route("/:jobId", "features/jobs/pages/job-page.tsx"),
  ]),

  ...prefix("auth", [
    route("/logout", "features/auth/pages/logout-page.tsx"),
    layout("features/auth/layouts/auth-layout.tsx", [
      route("/login", "features/auth/pages/login-page.tsx"),
      route("/join", "features/auth/pages/join-page.tsx"),
      ...prefix("otp", [
        route("/start", "features/auth/pages/otp-start-page.tsx"),
        route("/complete", "features/auth/pages/otp-complete-page.tsx"),
      ]),
      ...prefix("social/:provider", [
        route("/start", "features/auth/pages/social-start-page.tsx"),
        route("/complete", "features/auth/pages/social-complete-page.tsx"),
      ]),
    ]),
  ]),

  ...prefix("community", [
    index("features/community/pages/community-page.tsx"),
    route("/:postId", "features/community/pages/post-page.tsx"),
    route("/:postId/upvote", "features/community/pages/post-upvote-page.tsx"),
    route("/submit", "features/community/pages/post-submit-page.tsx"),
  ]),

  ...prefix("teams", [
    index("features/teams/pages/teams-page.tsx"),
    route("/:teamId", "features/teams/pages/team-page.tsx"),
    route("/submit", "features/teams/pages/team-submit-page.tsx"),
  ]),

  ...prefix("my", [
    layout("features/users/layouts/dashboard-layout.tsx", [
      ...prefix("dashboard", [
        index("features/users/pages/dashboard-page.tsx"),
        route("/ideas", "features/users/pages/dashboard-ideas-page.tsx"),
        route("/jobs", "features/users/pages/dashboard-jobs-page.tsx"),
        route("/teams", "features/users/pages/dashboard-teams-page.tsx"),
        route(
          "/products/:productId",
          "features/users/pages/dashboard-product-page.tsx"
        ),
      ]),
    ]),
    layout("features/users/layouts/messages-layout.tsx", [
      ...prefix("messages", [
        index("features/users/pages/messages-page.tsx"),
        route("/:messageId", "features/users/pages/message-page.tsx"),
      ]),
    ]),
    route("/notifications", "features/users/pages/notifications-page.tsx"),
    route(
      "/notifications/:notificationId/read",
      "features/users/pages/notification-read-page.tsx"
    ),
    route("/profile", "features/users/pages/profile-page.tsx"),
    route("/settings", "features/users/pages/settings-page.tsx"),
  ]),
  ...prefix("users/:username", [
    layout("features/users/layouts/user-layout.tsx", [
      index("features/users/pages/user-page.tsx"),
      route("/products", "features/users/pages/user-products-page.tsx"),
      route("/posts", "features/users/pages/user-posts-page.tsx"),
    ]),
    route("/messages", "features/users/pages/send-message-page.tsx"),
  ]),
] satisfies RouteConfig;
