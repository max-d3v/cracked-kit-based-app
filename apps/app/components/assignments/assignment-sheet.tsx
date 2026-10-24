"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Assignment } from "@workspace/types/use-cases/assignments";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  BookOpen,
  CalendarClock,
  Loader2,
  RotateCcw,
  Send,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDateTime, formatRelativeDue } from "@/lib/format";
import { useAssignmentsContext } from "./context";
import {
  approveAssignment,
  deleteAssignment,
  retryAssignment,
  updateAssignmentSolution,
} from "./mutations";
import {
  ProgressBar,
  StatusBadge,
  StatusIcon,
  statusConfig,
} from "./status-config";

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <div className="text-muted-foreground text-xs">{label}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}

function StatusNotice({ assignment }: { assignment: Assignment }) {
  if (assignment.status === "solving") {
    return (
      <div className="space-y-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="font-medium text-sm">Resolvendo agora…</p>
        <ProgressBar value={assignment.progress} />
      </div>
    );
  }
  if (assignment.status === "found") {
    return (
      <div className="rounded-lg border bg-muted/40 p-4 text-sm">
        Na fila. Começamos a resolver assim que os trabalhos com prazo mais
        próximo terminarem.
      </div>
    );
  }
  if (assignment.status === "failed") {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm">
        Essa tarefa pede algo que não conseguimos fazer sozinhos (por exemplo,
        uma apresentação ao vivo). Ela continua no Teams para você.
      </div>
    );
  }
  if (assignment.grade) {
    return (
      <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
        <p className="text-muted-foreground text-xs">Nota do professor</p>
        <p className="font-bold text-3xl text-violet-600 dark:text-violet-400">
          {assignment.grade}
        </p>
      </div>
    );
  }
  return null;
}

export function AssignmentSheet() {
  const queryClient = useQueryClient();
  const { selectedAssignment: assignment, setSelectedAssignment } =
    useAssignmentsContext();
  const [solution, setSolution] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const approve = useMutation(approveAssignment(queryClient));
  const retry = useMutation(retryAssignment(queryClient));
  const save = useMutation(updateAssignmentSolution(queryClient));
  const remove = useMutation(deleteAssignment(queryClient));

  useEffect(() => {
    setSolution(assignment?.solution ?? "");
  }, [assignment]);

  if (!assignment) {
    return null;
  }

  const close = () => setSelectedAssignment(null);
  const isReview = assignment.status === "review";
  const canRetry = isReview || assignment.status === "failed";
  const solutionChanged = solution !== (assignment.solution ?? "");
  const isBusy =
    approve.isPending || retry.isPending || save.isPending || remove.isPending;

  const handleApprove = async () => {
    if (solutionChanged) {
      await save.mutateAsync({ id: assignment.id, solution });
    }
    await approve.mutateAsync({ id: assignment.id });
    close();
  };

  const handleRetry = async () => {
    await retry.mutateAsync({ id: assignment.id });
    close();
  };

  const handleSave = async () => {
    await save.mutateAsync({ id: assignment.id, solution });
  };

  const handleDelete = async () => {
    await remove.mutateAsync({ id: assignment.id });
    setShowDeleteDialog(false);
    close();
  };

  return (
    <Sheet onOpenChange={(open) => !open && close()} open>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <StatusIcon className="h-4 w-4" status={assignment.status} />
            <StatusBadge status={assignment.status} />
          </div>
          <SheetTitle className="text-xl">{assignment.title}</SheetTitle>
          <SheetDescription>
            {statusConfig[assignment.status].description}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4">
          <StatusNotice assignment={assignment} />

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailRow
              icon={BookOpen}
              label="Matéria"
              value={assignment.subject}
            />
            <DetailRow
              icon={Users}
              label="Turma"
              value={assignment.classroom}
            />
            {assignment.teacher && (
              <DetailRow
                icon={User}
                label="Professor(a)"
                value={assignment.teacher}
              />
            )}
            {assignment.dueDate && (
              <DetailRow
                icon={CalendarClock}
                label="Prazo"
                value={`${formatDateTime(assignment.dueDate)} · ${formatRelativeDue(assignment.dueDate)}`}
              />
            )}
            {assignment.submittedAt && (
              <DetailRow
                icon={Send}
                label="Enviado no Teams"
                value={formatDateTime(assignment.submittedAt)}
              />
            )}
          </div>

          {assignment.instructions && (
            <section className="space-y-2">
              <h3 className="font-medium text-sm">Enunciado</h3>
              <p className="whitespace-pre-line rounded-lg border bg-muted/30 p-3 text-muted-foreground text-sm">
                {assignment.instructions}
              </p>
            </section>
          )}

          {isReview && (
            <section className="space-y-2">
              <label className="font-medium text-sm" htmlFor="solution">
                Resolução
              </label>
              <Textarea
                className="min-h-56 resize-y text-sm"
                id="solution"
                onChange={(e) => setSolution(e.target.value)}
                value={solution}
              />
              <p className="text-muted-foreground text-xs">
                Ajuste o que quiser antes de aprovar. O envio é feito no Teams
                em seu nome.
              </p>
            </section>
          )}

          {!isReview && assignment.solution && (
            <section className="space-y-2">
              <h3 className="font-medium text-sm">Resolução enviada</h3>
              <p className="whitespace-pre-line rounded-lg border p-3 text-sm">
                {assignment.solution}
              </p>
            </section>
          )}
        </div>

        <SheetFooter className="gap-2">
          {isReview && (
            <Button disabled={isBusy} onClick={handleApprove}>
              {approve.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Aprovar e enviar no Teams
            </Button>
          )}
          {isReview && solutionChanged && (
            <Button disabled={isBusy} onClick={handleSave} variant="outline">
              Salvar edição
            </Button>
          )}
          {canRetry && (
            <Button disabled={isBusy} onClick={handleRetry} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Resolver de novo
            </Button>
          )}
          <Button
            disabled={isBusy}
            onClick={() => setShowDeleteDialog(true)}
            size="sm"
            variant="ghost"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remover da lista
          </Button>
        </SheetFooter>
      </SheetContent>

      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover trabalho?</AlertDialogTitle>
            <AlertDialogDescription>
              "{assignment.title}" sai da sua lista no Catolifeito. Nada muda no
              Teams.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              disabled={remove.isPending}
              onClick={handleDelete}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}
