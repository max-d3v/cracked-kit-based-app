"use client";

import type { Assignment } from "@workspace/types/use-cases/assignments";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { cn } from "@workspace/ui/lib/utils";
import { Inbox } from "lucide-react";
import { formatDate, formatRelativeDue, isDueSoon } from "@/lib/format";
import {
  ProgressBar,
  StatusBadge,
  type StatusFilter,
  StatusIcon,
  statusConfig,
} from "./status-config";
import { SyncButton } from "./sync-button";

interface AssignmentsTableProps {
  assignments: Assignment[];
  onSelect: (assignment: Assignment) => void;
  searchQuery: string;
  statusFilter: StatusFilter;
  total: number;
}

const isOpenStatus = (status: Assignment["status"]) =>
  status === "found" || status === "solving" || status === "review";

function DueCell({ assignment }: { assignment: Assignment }) {
  if (!assignment.dueDate) {
    return <span className="text-muted-foreground text-sm">Sem prazo</span>;
  }
  const urgent =
    isOpenStatus(assignment.status) && isDueSoon(assignment.dueDate);

  return (
    <div className="flex flex-col">
      <span className="text-sm">{formatDate(assignment.dueDate)}</span>
      <span
        className={cn(
          "text-xs",
          urgent ? "font-medium text-amber-600" : "text-muted-foreground"
        )}
      >
        {formatRelativeDue(assignment.dueDate)}
      </span>
    </div>
  );
}

function ResultCell({ assignment }: { assignment: Assignment }) {
  if (assignment.status === "solving") {
    return <ProgressBar value={assignment.progress} />;
  }
  if (assignment.grade) {
    return (
      <span className="font-semibold text-sm text-violet-600 dark:text-violet-400">
        Nota {assignment.grade}
      </span>
    );
  }
  if (assignment.submittedAt) {
    return (
      <span className="text-muted-foreground text-xs">
        Enviado {formatDate(assignment.submittedAt)}
      </span>
    );
  }
  return <span className="text-muted-foreground text-xs">—</span>;
}

export function AssignmentsTable({
  assignments,
  total,
  statusFilter,
  searchQuery,
  onSelect,
}: AssignmentsTableProps) {
  const title =
    statusFilter === "all"
      ? "Todos os trabalhos"
      : `Trabalhos: ${statusConfig[statusFilter].label.toLowerCase()}`;

  const hasFilters = searchQuery !== "" || statusFilter !== "all";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {assignments.length === 0
            ? "Nada por aqui"
            : `${total} trabalhos encontrados nas suas turmas do Teams`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {assignments.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[44px]" />
                  <TableHead>Trabalho</TableHead>
                  <TableHead className="hidden lg:table-cell">Turma</TableHead>
                  <TableHead className="hidden w-[120px] sm:table-cell">
                    Prazo
                  </TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead className="hidden w-[140px] md:table-cell">
                    Progresso
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow
                    className="cursor-pointer"
                    key={assignment.id}
                    onClick={() => onSelect(assignment)}
                  >
                    <TableCell>
                      <StatusIcon status={assignment.status} />
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(assignment);
                        }}
                        type="button"
                      >
                        <span className="block font-medium hover:text-primary">
                          {assignment.title}
                        </span>
                        <span className="block text-muted-foreground text-xs">
                          {assignment.subject}
                        </span>
                      </button>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="block text-sm">
                        {assignment.classroom}
                      </span>
                      {assignment.teacher && (
                        <span className="block text-muted-foreground text-xs">
                          {assignment.teacher}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <DueCell assignment={assignment} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={assignment.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ResultCell assignment={assignment} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
            <Inbox className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-medium text-lg">
              {hasFilters
                ? "Nenhum trabalho encontrado"
                : "Nenhum trabalho ainda"}
            </h3>
            <p className="mb-4 max-w-sm text-muted-foreground text-sm">
              {hasFilters
                ? "Tente ajustar a busca ou os filtros."
                : "Sincronize com o Teams para escanearmos as tarefas das suas turmas."}
            </p>
            {!hasFilters && <SyncButton />}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
