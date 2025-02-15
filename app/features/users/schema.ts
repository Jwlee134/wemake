import {
  pgSchema,
  text,
  uuid,
  pgTable,
  timestamp,
  pgEnum,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const roles = pgEnum("role", [
  "developer",
  "designer",
  "marketer",
  "founder",
  "product-manager",
]);

// Supabase already has auth schema and users table inside of it by default.
// The reason why we are doing this is to let drizzle know that we have a users table in our database.
const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

// This table is going to have one to one relationship with auth table.
export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().default("developer").notNull(),
  stats: jsonb().notNull().default({ followers: 0, following: 0 }),
  views: jsonb(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable(
  "follows",
  {
    follower_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    following_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.follower_id, t.following_id] })]
);
