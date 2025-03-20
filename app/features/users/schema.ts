import {
  pgSchema,
  text,
  uuid,
  pgTable,
  timestamp,
  pgEnum,
  jsonb,
  primaryKey,
  bigint,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { products } from "../products/schema";
import { posts } from "../community/schema";

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
    follower_id: uuid()
      .notNull()
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      }),
    following_id: uuid()
      .notNull()
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.follower_id, t.following_id] })]
);

export const notificationType = pgEnum("notification_type", [
  "follow",
  "review",
  "reply",
  "mention",
]);

export const notifications = pgTable("notifications", {
  notification_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  sender_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  receiver_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(),
  product_id: bigint({ mode: "number" }).references(() => products.product_id, {
    onDelete: "cascade",
  }),
  post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  type: notificationType().notNull(),
  seen: boolean().notNull().default(false),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRooms = pgTable("message_rooms", {
  message_room_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
  "message_room_members",
  {
    message_room_id: bigint({ mode: "number" }).references(
      () => messageRooms.message_room_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.message_room_id, t.profile_id] })]
);

export const messages = pgTable("messages", {
  message_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  message_room_id: bigint({ mode: "number" })
    .notNull()
    .references(() => messageRooms.message_room_id, {
      onDelete: "cascade",
    }),
  sender_id: uuid()
    .notNull()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
  content: text().notNull(),
  seen_by: integer().notNull().default(0),
  created_at: timestamp().notNull().defaultNow(),
});
