"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { AlertCircle } from "lucide-react";

interface BillingErrorProps {
  readonly error: Error | unknown;
  readonly onRetry: () => void;
}

export function BillingError({ error, onRetry }: BillingErrorProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base">
              Não foi possível carregar sua assinatura
            </CardTitle>
          </div>
          <CardDescription>
            {error instanceof Error
              ? error.message
              : "Ocorreu um erro ao buscar sua assinatura. Tente de novo."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onRetry} size="sm" variant="outline">
            Tentar de novo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
