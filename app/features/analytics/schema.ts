import { jsonb, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const eventType = pgEnum("event_type", [
  "product_view",
  "profile_view",
  "product_visit",
]);

export const events = pgTable("events", {
  event_id: uuid("event_id").primaryKey().defaultRandom(),
  event_type: eventType("event_type").notNull(),
  // One of the advantages of using jsonb is that we can store arbitrary data that can be inserted later
  // and we don't need to define the schema in advance
  event_data: jsonb("event_data").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
