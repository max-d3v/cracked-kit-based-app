import { EVENTS } from "@workspace/analytics/events";
import { capture } from "@workspace/analytics/server";
import {
  createMany,
  dismissOne,
  get,
  list,
  updateOne,
} from "@workspace/repository/entities/assignments";
import { HttpError } from "@workspace/types/errors/http";
import type { AssignmentRawObject } from "@workspace/types/repository/assignments";
import type {
  AssignmentCounts,
  AssignmentsListResponse,
  SyncAssignmentsResponse,
  UpdateAssignmentSolution,
  UserAssignment,
  UserIdInput,
} from "@workspace/types/use-cases/assignments";
import { buildDemoAssignments } from "../lib/teams-demo";

const RETRY_START_PROGRESS = 5;

/** What needs attention first: ready to approve, in progress, then done. */
const STATUS_PRIORITY: Record<AssignmentRawObject["status"], number> = {
  review: 0,
  failed: 1,
  solving: 2,
  found: 3,
  submitted: 4,
  graded: 5,
};

const dueTime = (assignment: AssignmentRawObject) =>
  assignment.dueDate?.getTime() ?? Number.POSITIVE_INFINITY;

const sortByPriority = (assignments: AssignmentRawObject[]) =>
  [...assignments].sort((a, b) => {
    const byStatus = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (byStatus !== 0) {
      return byStatus;
    }
    const isDone = a.status === "submitted" || a.status === "graded";
    return isDone ? dueTime(b) - dueTime(a) : dueTime(a) - dueTime(b);
  });

const countAssignmentsByStatus = (
  assignments: AssignmentRawObject[]
): AssignmentCounts => ({
  pending: assignments.filter(
    (a) => a.status === "found" || a.status === "solving"
  ).length,
  review: assignments.filter((a) => a.status === "review").length,
  submitted: assignments.filter(
    (a) => a.status === "submitted" || a.status === "graded"
  ).length,
  failed: assignments.filter((a) => a.status === "failed").length,
});

export const getUserAssignments = async (
  params: UserIdInput
): Promise<AssignmentsListResponse> => {
  const assignments = sortByPriority(await list({ userId: params.userId }));
  return { assignments, counts: countAssignmentsByStatus(assignments) };
};

/**
 * Simulates scanning the user's Microsoft Teams classes.
 * Inserts any demo assignment the user doesn't have yet. Dismissed ones still
 * count as "had", so removing an assignment sticks across syncs.
 */
export const syncAssignments = async (
  params: UserIdInput
): Promise<SyncAssignmentsResponse> => {
  const { userId } = params;

  const created = await createMany(buildDemoAssignments(userId));

  capture({
    event: EVENTS.assignments_synced,
    userId,
    details: { created: created.length },
  });

  return { created: created.length };
};

export const approveAssignment = async (params: UserAssignment) => {
  const { userId, assignmentId } = params;

  const current = await get({ id: assignmentId, userId });
  if (current.status !== "review") {
    return current;
  }

  capture({
    event: EVENTS.assignment_submitted,
    userId,
    details: { assignmentId },
  });

  return await updateOne({
    id: assignmentId,
    userId,
    status: "submitted",
    progress: 100,
    submittedAt: new Date(),
  });
};

export const retryAssignment = async (params: UserAssignment) => {
  const { userId, assignmentId } = params;

  const current = await get({ id: assignmentId, userId });
  if (current.status !== "review" && current.status !== "failed") {
    return current;
  }

  return await updateOne({
    id: assignmentId,
    userId,
    status: "solving",
    progress: RETRY_START_PROGRESS,
    solution: null,
    submittedAt: null,
  });
};

export const updateAssignmentSolution = async (
  params: UpdateAssignmentSolution
) => {
  const { userId, assignmentId, solution } = params;

  const current = await get({ id: assignmentId, userId });
  if (current.status !== "review") {
    throw new HttpError(
      409,
      "Only assignments awaiting review can have their solution edited"
    );
  }

  return await updateOne({ id: assignmentId, userId, solution });
};

export const deleteAssignment = async (params: UserAssignment) => {
  const { userId, assignmentId } = params;

  await dismissOne({ id: assignmentId, userId });
  return { deleted: true };
};
