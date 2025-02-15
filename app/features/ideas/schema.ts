import {
  pgTable,
  text,
  bigint,
  timestamp,
  integer,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const gptIdeas = pgTable("gpt_ideas", {
  idea_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  idea: text().notNull(),
  views: integer().notNull().default(0),
  claimed_at: timestamp(),
  claimed_by: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const gpt_ideas_likes = pgTable(
  "gpt_ideas_likes",
  {
    idea_id: bigint({ mode: "number" }).references(() => gptIdeas.idea_id, {
      onDelete: "cascade",
    }),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    created_at: timestamp().notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.idea_id, t.profile_id] })]
);
