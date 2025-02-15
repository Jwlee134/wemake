import {
  pgTable,
  text,
  bigint,
  timestamp,
  integer,
  uuid,
  primaryKey,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const postTopics = pgTable("post_topics", {
  topic_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  post_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  content: text().notNull(),
  topic_id: bigint({ mode: "number" }).references(() => postTopics.topic_id, {
    onDelete: "set null",
  }),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const postUpvotes = pgTable(
  "post_upvotes",
  {
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
      onDelete: "cascade",
    }),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.post_id, t.profile_id] })]
);

export const postReplies = pgTable("post_replies", {
  reply_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
    onDelete: "cascade",
  }),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: "set null",
  }),
  parent_reply_id: bigint({ mode: "number" }).references(
    (): AnyPgColumn => postReplies.reply_id,
    { onDelete: "set null" }
  ),
  content: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
