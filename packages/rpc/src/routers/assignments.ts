import {
  approveAssignment,
  deleteAssignment,
  getUserAssignments,
  retryAssignment,
  syncAssignments,
  updateAssignmentSolution,
} from "@workspace/core/use-cases/assignments";
import {
  assignmentIdInputSchema,
  updateAssignmentSolutionInputSchema,
} from "@workspace/types/use-cases/assignments";
import { authenticatedProcedure } from "../procedures";

const assignmentsRouter = {
  list: authenticatedProcedure.handler(async ({ context }) => {
    const { id } = context.user;
    return await getUserAssignments({ userId: id });
  }),
  sync: authenticatedProcedure.handler(async ({ context }) => {
    const { id } = context.user;
    return await syncAssignments({ userId: id });
  }),
  approve: authenticatedProcedure
    .input(assignmentIdInputSchema)
    .handler(async ({ context, input }) => {
      const { id: userId } = context.user;
      return await approveAssignment({ userId, assignmentId: input.id });
    }),
  retry: authenticatedProcedure
    .input(assignmentIdInputSchema)
    .handler(async ({ context, input }) => {
      const { id: userId } = context.user;
      return await retryAssignment({ userId, assignmentId: input.id });
    }),
  updateSolution: authenticatedProcedure
    .input(updateAssignmentSolutionInputSchema)
    .handler(async ({ context, input }) => {
      const { id: userId } = context.user;
      return await updateAssignmentSolution({
        userId,
        assignmentId: input.id,
        solution: input.solution,
      });
    }),
  delete: authenticatedProcedure
    .input(assignmentIdInputSchema)
    .handler(async ({ context, input }) => {
      const { id: userId } = context.user;
      return await deleteAssignment({ userId, assignmentId: input.id });
    }),
};

export default assignmentsRouter;
