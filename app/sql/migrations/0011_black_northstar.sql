CREATE TYPE "public"."event_type" AS ENUM('product_view', 'profile_view', 'product_visit');--> statement-breakpoint
CREATE TABLE "events" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_type" "event_type" NOT NULL,
	"event_data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
