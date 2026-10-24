import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

const STAT_CARD_KEYS = ["stat-1", "stat-2", "stat-3", "stat-4"];
const ROW_KEYS = ["row-1", "row-2", "row-3", "row-4", "row-5"];

export function AssignmentsLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARD_KEYS.map((key) => (
          <Card key={key}>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-28" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-3">
          {ROW_KEYS.map((key) => (
            <div
              className="flex items-center gap-3 rounded-lg border p-4"
              key={key}
            >
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
