import { getQueryClient, HydrateClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { Suspense } from "react";
import { AssignmentSheet } from "@/components/assignments/assignment-sheet";
import { AssignmentsContent } from "@/components/assignments/assignments-content";
import { AssignmentsLoading } from "@/components/assignments/assignments-loading";
import { AssignmentsPagination } from "@/components/assignments/assignments-pagination";
import { AssignmentsPerPage } from "@/components/assignments/assignments-per-page";
import { AssignmentsProvider } from "@/components/assignments/context";
import { SyncButton } from "@/components/assignments/sync-button";

export const metadata = {
  title: "Trabalhos · Catolifeito",
};

export default async function AssignmentsPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(orpc.assignments.list.queryOptions());

  return (
    <AssignmentsProvider>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl">Trabalhos</h1>
            <p className="text-muted-foreground">
              Tudo o que encontramos no seu Teams — resolvido, sendo resolvido
              ou já entregue.
            </p>
          </div>
          <SyncButton />
        </div>

        <Suspense fallback={<AssignmentsLoading />}>
          <HydrateClient client={queryClient}>
            <AssignmentsContent />
          </HydrateClient>
        </Suspense>

        <div className="flex items-center justify-between">
          <AssignmentsPerPage />
          <AssignmentsPagination />
        </div>

        <AssignmentSheet />
      </div>
    </AssignmentsProvider>
  );
}
