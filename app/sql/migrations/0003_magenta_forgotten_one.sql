CREATE TABLE "gpt_ideas" (
	"idea_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gpt_ideas_idea_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"idea" text NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"claimed_at" timestamp,
	"claimed_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gpt_ideas_likes" (
	"idea_id" bigint,
	"profile_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "gpt_ideas_likes_idea_id_profile_id_pk" PRIMARY KEY("idea_id","profile_id")
);
--> statement-breakpoint
ALTER TABLE "gpt_ideas" ADD CONSTRAINT "gpt_ideas_claimed_by_profiles_profile_id_fk" FOREIGN KEY ("claimed_by") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_idea_id_gpt_ideas_idea_id_fk" FOREIGN KEY ("idea_id") REFERENCES "public"."gpt_ideas"("idea_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;