import { getQueryClient, HydrateClient } from "@workspace/data-layer/hydration";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { Suspense } from "react";
import { AnalyticsContent } from "@/components/analytics";
import { AnalyticsLoading } from "@/components/analytics/analytics-loading";

export default async function AnalyticsPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(orpc.assignments.list.queryOptions());

  return (
    <Suspense fallback={<AnalyticsLoading />}>
      <HydrateClient client={queryClient}>
        <AnalyticsContent />
      </HydrateClient>
    </Suspense>
  );
}
