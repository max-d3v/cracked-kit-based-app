import { getQueryClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { AssignmentsStats } from "@/components/assignments/assignments-stats";
import { DashboardAssignmentLists } from "./dashboard-assignment-lists";
import { DashboardReviewCallout } from "./dashboard-review-callout";

export async function Dashboard() {
  const queryClient = getQueryClient();

  const { assignments, counts } = await queryClient.fetchQuery(
    orpc.assignments.list.queryOptions()
  );

  return (
    <>
      <DashboardReviewCallout count={counts.review} />
      <AssignmentsStats counts={counts} />
      <DashboardAssignmentLists assignments={assignments} />
    </>
  );
}
