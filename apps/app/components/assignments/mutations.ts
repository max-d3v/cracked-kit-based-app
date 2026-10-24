"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { toast } from "sonner";

// Awaited in onSuccess so mutateAsync resolves only once the list is fresh.
const invalidateAssignments = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: orpc.assignments.list.key(),
  });

export function syncAssignments(queryClient: QueryClient) {
  return orpc.assignments.sync.mutationOptions({
    meta: { errorTitle: "Não foi possível sincronizar com o Teams" },
    onSuccess: async ({ created }) => {
      await invalidateAssignments(queryClient);
      toast.success(
        created > 0
          ? `${created} trabalhos novos encontrados no Teams`
          : "Tudo em dia — nenhum trabalho novo no Teams"
      );
    },
  });
}

export function approveAssignment(queryClient: QueryClient) {
  return orpc.assignments.approve.mutationOptions({
    meta: { errorTitle: "Não foi possível enviar o trabalho" },
    onSuccess: async () => {
      await invalidateAssignments(queryClient);
      toast.success("Trabalho enviado no Teams!");
    },
  });
}

export function retryAssignment(queryClient: QueryClient) {
  return orpc.assignments.retry.mutationOptions({
    meta: { errorTitle: "Não foi possível resolver de novo" },
    onSuccess: async () => {
      await invalidateAssignments(queryClient);
      toast.success("Resolvendo de novo…");
    },
  });
}

export function updateAssignmentSolution(queryClient: QueryClient) {
  return orpc.assignments.updateSolution.mutationOptions({
    meta: { errorTitle: "Não foi possível salvar a resolução" },
    onSuccess: async () => {
      await invalidateAssignments(queryClient);
      toast.success("Resolução salva");
    },
  });
}

export function deleteAssignment(queryClient: QueryClient) {
  return orpc.assignments.delete.mutationOptions({
    meta: { errorTitle: "Não foi possível remover o trabalho" },
    onSuccess: async () => {
      await invalidateAssignments(queryClient);
      toast.success("Trabalho removido");
    },
  });
}
