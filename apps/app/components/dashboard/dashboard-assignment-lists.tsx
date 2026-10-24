import type { Assignment } from "@workspace/types/use-cases/assignments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ProgressBar,
  StatusBadge,
  StatusIcon,
} from "@/components/assignments/status-config";
import { SyncButton } from "@/components/assignments/sync-button";
import { formatDate, formatRelativeDue } from "@/lib/format";

const PREVIEW_SIZE = 5;

const OPEN_STATUSES = new Set<Assignment["status"]>([
  "found",
  "solving",
  "review",
  "failed",
]);

const toTime = (date: Date | string | null) =>
  date ? new Date(date).getTime() : Number.POSITIVE_INFINITY;

function AssignmentRow({
  assignment,
  meta,
}: {
  assignment: Assignment;
  meta: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      <StatusIcon status={assignment.status} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">{assignment.title}</p>
        <p className="truncate text-muted-foreground text-xs">
          {assignment.subject} · {meta}
        </p>
      </div>
      {assignment.status === "solving" ? (
        <ProgressBar value={assignment.progress} />
      ) : (
        <StatusBadge status={assignment.status} />
      )}
    </div>
  );
}

export function DashboardAssignmentLists({
  assignments,
}: {
  assignments: Assignment[];
}) {
  if (assignments.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Nenhum trabalho ainda</CardTitle>
          <CardDescription>
            Sincronize com o Teams para escanearmos as tarefas das suas turmas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SyncButton />
        </CardContent>
      </Card>
    );
  }

  const upcoming = assignments
    .filter((a) => OPEN_STATUSES.has(a.status))
    .sort((a, b) => toTime(a.dueDate) - toTime(b.dueDate))
    .slice(0, PREVIEW_SIZE);

  const recentlySubmitted = assignments
    .filter((a) => a.submittedAt)
    .sort((a, b) => toTime(b.submittedAt) - toTime(a.submittedAt))
    .slice(0, PREVIEW_SIZE);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Próximos prazos</CardTitle>
          <CardDescription>O que ainda está em andamento</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {upcoming.length > 0 ? (
            upcoming.map((assignment) => (
              <AssignmentRow
                assignment={assignment}
                key={assignment.id}
                meta={
                  assignment.dueDate
                    ? `vence ${formatRelativeDue(assignment.dueDate)}`
                    : "sem prazo"
                }
              />
            ))
          ) : (
            <p className="py-6 text-center text-muted-foreground text-sm">
              Tudo entregue. Nada pendente! 🎉
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entregues recentemente</CardTitle>
          <CardDescription>Enviados no Teams em seu nome</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentlySubmitted.length > 0 ? (
            recentlySubmitted.map((assignment) => (
              <AssignmentRow
                assignment={assignment}
                key={assignment.id}
                meta={
                  assignment.grade
                    ? `nota ${assignment.grade}`
                    : `enviado ${formatDate(assignment.submittedAt ?? assignment.updatedAt)}`
                }
              />
            ))
          ) : (
            <p className="py-6 text-center text-muted-foreground text-sm">
              Nenhuma entrega ainda.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
