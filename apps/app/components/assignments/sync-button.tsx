"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { RefreshCw } from "lucide-react";
import { syncAssignments } from "./mutations";

export function SyncButton({
  variant = "default",
}: {
  variant?: "default" | "outline";
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation(syncAssignments(queryClient));

  return (
    <Button disabled={isPending} onClick={() => mutate({})} variant={variant}>
      <RefreshCw className={cn("mr-2 h-4 w-4", isPending && "animate-spin")} />
      {isPending ? "Escaneando o Teams…" : "Sincronizar com Teams"}
    </Button>
  );
}
