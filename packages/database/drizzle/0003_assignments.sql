CREATE TYPE "public"."assignment_status" AS ENUM('found', 'solving', 'review', 'submitted', 'graded', 'failed');--> statement-breakpoint
CREATE TABLE "assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"subject" varchar(100) NOT NULL,
	"classroom" varchar(255) NOT NULL,
	"teacher" varchar(255),
	"instructions" text,
	"solution" text,
	"status" "assignment_status" DEFAULT 'found' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"grade" varchar(20),
	"due_date" timestamp,
	"submitted_at" timestamp,
	"dismissed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "task" CASCADE;--> statement-breakpoint
CREATE UNIQUE INDEX "assignment_user_id_title_unique" ON "assignment" USING btree ("user_id","title");--> statement-breakpoint
DROP TYPE "public"."task_status";