import { defineConfig } from "drizzle-kit";

// drizzle-kit is going to be monitoring this config.
export default defineConfig({
  schema: "./app/features/**/schema.ts", // the file path where the definition of tables is located
  out: "./app/sql/migrations", // the file path where the drizzle-kit is going to put the generated sql files
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
