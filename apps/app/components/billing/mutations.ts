"use client";

import type { QueryClient } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { toast } from "sonner";

export function cancelSubscription(queryClient: QueryClient) {
  return orpc.billing.cancelSubscription.mutationOptions({
    meta: { errorTitle: "Não foi possível cancelar a assinatura" },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orpc.billing.getSubscription.key(),
      });
      toast.success(
        "Assinatura cancelada. Ela termina no fim do período de cobrança atual."
      );
    },
  });
}
