"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { toast } from "sonner";

export function updateProfile(queryClient: QueryClient) {
  return orpc.users.updateProfile.mutationOptions({
    meta: { errorTitle: "Não foi possível atualizar o perfil" },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpc.users.getUser.key(),
      });
      toast.success("Perfil atualizado com sucesso!");
    },
  });
}

export function deleteAccount(_queryClient: QueryClient) {
  return orpc.users.deleteAccount.mutationOptions({
    meta: { errorTitle: "Não foi possível excluir a conta" },
    onSuccess: () => {
      window.location.href = "/";
    },
  });
}
