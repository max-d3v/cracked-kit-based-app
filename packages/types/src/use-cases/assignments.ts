import { z } from "zod";
import type { AssignmentRawObject } from "../repository/assignments";

export type Assignment = AssignmentRawObject;

export type AssignmentCounts = {
  pending: number;
  review: number;
  submitted: number;
  failed: number;
};

export type AssignmentsListResponse = {
  assignments: Assignment[];
  counts: AssignmentCounts;
};

export type SyncAssignmentsResponse = { created: number };
export type DeleteAssignmentResponse = { deleted: boolean };

export const assignmentIdInputSchema = z.object({
  id: z.string().uuid(),
});

export const updateAssignmentSolutionInputSchema = z.object({
  id: z.string().uuid(),
  solution: z.string().min(1),
});

export const userAssignmentSchema = z.object({
  userId: z.string(),
  assignmentId: z.string().uuid(),
});

export const updateAssignmentSolutionSchema = userAssignmentSchema.extend({
  solution: z.string().min(1),
});

export const userIdSchema = z.object({
  userId: z.string(),
});

export type AssignmentIdInput = z.infer<typeof assignmentIdInputSchema>;
export type UpdateAssignmentSolutionInput = z.infer<
  typeof updateAssignmentSolutionInputSchema
>;
export type UserAssignment = z.infer<typeof userAssignmentSchema>;
export type UpdateAssignmentSolution = z.infer<
  typeof updateAssignmentSolutionSchema
>;
export type UserIdInput = z.infer<typeof userIdSchema>;
