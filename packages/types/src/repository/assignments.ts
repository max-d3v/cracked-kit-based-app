import type { assignment } from "@workspace/database/schema";
import type { ListBaseParams } from "./base";

export type AssignmentRawObject = typeof assignment.$inferSelect;

export type AssignmentStatus = AssignmentRawObject["status"];

export type CreateAssignmentParams = typeof assignment.$inferInsert;

export type UpdateAssignmentParams = Partial<typeof assignment.$inferInsert> & {
  id: string;
  userId: string;
};

export type WhereParams = {
  userId: string;
};

export type GetAssignmentParams = {
  id: string;
  userId: string;
};

export type DismissAssignmentParams = {
  id: string;
  userId: string;
};

export type WhereClauseParams = WhereParams & {
  search?: string;
};

export type ListAssignmentsParams = ListBaseParams & WhereParams;
