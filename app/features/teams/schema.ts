import {
  pgTable,
  text,
  bigint,
  timestamp,
  integer,
  pgEnum,
  check,
  uuid,
} from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";
import { sql } from "drizzle-orm";
import { profiles } from "../users/schema";

export const productStages = pgEnum(
  "product_stages",
  PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]]
);

export const teams = pgTable(
  "teams",
  {
    team_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_name: text().notNull(),
    team_size: integer().notNull(),
    equity_split: integer().notNull(),
    roles: text().notNull(),
    product_description: text().notNull(),
    product_stage: productStages().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    team_leader_id: uuid()
      .notNull()
      .references(() => profiles.profile_id, {
        onDelete: "cascade",
      }),
  },
  (t) => [
    check("equity_split_check", sql`${t.equity_split} BETWEEN 1 AND 100`),
    check("team_size_check", sql`${t.team_size} BETWEEN 1 AND 100`),
    check(
      "product_description_check",
      sql`LENGTH(${t.product_description}) <= 200`
    ),
  ]
);
