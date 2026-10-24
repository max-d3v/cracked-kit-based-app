"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import type { Assignment } from "@workspace/types/use-cases/assignments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  Timer,
} from "lucide-react";
import { useMemo } from "react";
import {
  STATUS_ORDER,
  StatusIcon,
  statusConfig,
} from "@/components/assignments/status-config";
import { SyncButton } from "@/components/assignments/sync-button";

const parseGrade = (grade: string | null) => {
  if (!grade) {
    return null;
  }
  const value = Number.parseFloat(grade.replace(",", "."));
  return Number.isNaN(value) ? null : value;
};

const isDelivered = (a: Assignment) =>
  a.status === "submitted" || a.status === "graded";

const percent = (part: number, total: number) =>
  total > 0 ? Math.round((part / total) * 100) : 0;

const gradeFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

function computeAnalytics(assignments: Assignment[]) {
  const delivered = assignments.filter(isDelivered);
  const onTime = delivered.filter(
    (a) =>
      a.submittedAt &&
      (!a.dueDate || new Date(a.submittedAt) <= new Date(a.dueDate))
  );
  const grades = assignments
    .map((a) => parseGrade(a.grade))
    .filter((g): g is number => g !== null);
  const averageGrade =
    grades.length > 0
      ? grades.reduce((sum, g) => sum + g, 0) / grades.length
      : null;
  const inProgress = assignments.filter(
    (a) => a.status === "found" || a.status === "solving"
  ).length;

  const bySubject = new Map<string, { total: number; delivered: number }>();
  for (const a of assignments) {
    const entry = bySubject.get(a.subject) ?? { total: 0, delivered: 0 };
    entry.total += 1;
    if (isDelivered(a)) {
      entry.delivered += 1;
    }
    bySubject.set(a.subject, entry);
  }

  const statusBreakdown = STATUS_ORDER.map((status) => {
    const count = assignments.filter((a) => a.status === status).length;
    return { status, count, percentage: percent(count, assignments.length) };
  }).filter((item) => item.count > 0);

  return {
    delivered: delivered.length,
    onTimeRate: percent(onTime.length, delivered.length),
    averageGrade,
    gradedCount: grades.length,
    inProgress,
    subjects: [...bySubject.entries()]
      .map(([subject, counts]) => ({ subject, ...counts }))
      .sort((a, b) => b.total - a.total),
    statusBreakdown,
  };
}

const ANALYTICS_REFETCH_INTERVAL = 10_000;

export function AnalyticsContent() {
  const { data } = useSuspenseQuery(
    orpc.assignments.list.queryOptions({
      refetchInterval: ANALYTICS_REFETCH_INTERVAL,
    })
  );
  const { assignments } = data;

  const analytics = useMemo(() => computeAnalytics(assignments), [assignments]);

  if (assignments.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-muted-foreground">
          Ainda não há dados. Sincronize com o Teams para começar.
        </p>
        <SyncButton />
      </div>
    );
  }

  const stats = [
    {
      label: "Entregues",
      value: String(analytics.delivered),
      hint: `de ${assignments.length} trabalhos`,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "No prazo",
      value: `${analytics.onTimeRate}%`,
      hint: "das entregas",
      icon: CalendarCheck,
      color: "text-blue-500",
    },
    {
      label: "Média das notas",
      value:
        analytics.averageGrade === null
          ? "—"
          : gradeFormatter.format(analytics.averageGrade),
      hint: `${analytics.gradedCount} trabalhos corrigidos`,
      icon: GraduationCap,
      color: "text-violet-500",
    },
    {
      label: "Em andamento",
      value: String(analytics.inProgress),
      hint: "na fila ou resolvendo",
      icon: Timer,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-3xl">Desempenho</h1>
        <p className="text-muted-foreground">
          Como estão suas entregas e notas neste semestre.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-medium text-muted-foreground text-sm">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-3xl">{stat.value}</div>
                <p className="text-muted-foreground text-xs">{stat.hint}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Por matéria</CardTitle>
            <CardDescription>
              Trabalhos entregues em cada matéria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.subjects.map((item) => (
              <div key={item.subject}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {item.delivered}/{item.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${percent(item.delivered, item.total)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Por status</CardTitle>
            <CardDescription>Onde cada trabalho está agora</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analytics.statusBreakdown.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium">
                    <StatusIcon className="h-4 w-4" status={item.status} />
                    {statusConfig[item.status].label}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
