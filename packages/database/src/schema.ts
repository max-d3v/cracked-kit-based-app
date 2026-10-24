import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// biome-ignore lint/performance/noNamespaceImport: This is auto generated on top of we always using all the schemas.
import * as authSchema from "./auth-schema";

export * from "./auth-schema";

export const assignmentStatusEnum = pgEnum("assignment_status", [
  "found",
  "solving",
  "review",
  "submitted",
  "graded",
  "failed",
]);

export const organizationRole = pgEnum("organization_roles", [
  "owner",
  "admin",
  "member",
]);

export const subscription = pgTable("subscription", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),

  plan: varchar({ length: 50 }).default("free"),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripeSubscriptionStatus: varchar("stripe_subscription_status", {
    length: 50,
  }),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assignment = pgTable("assignment", {
  id: uuid().default(sql`gen_random_uuid()`).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),

  title: varchar({ length: 255 }).notNull(),
  subject: varchar({ length: 100 }).notNull(),
  classroom: varchar({ length: 255 }).notNull(),
  teacher: varchar({ length: 255 }),
  instructions: text(),
  solution: text(),
  status: assignmentStatusEnum().default("found").notNull(),
  progress: integer().default(0).notNull(),
  grade: varchar({ length: 20 }),

  dueDate: timestamp("due_date"),
  submittedAt: timestamp("submitted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(authSchema.user, {
    fields: [subscription.userId],
    references: [authSchema.user.id],
  }),
}));

export const assignmentRelations = relations(assignment, ({ one }) => ({
  user: one(authSchema.user, {
    fields: [assignment.userId],
    references: [authSchema.user.id],
  }),
}));

export const schema = {
  subscription,
  assignment,
  subscriptionRelations,
  assignmentRelations,
  ...authSchema,
};
