"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

type ErrorBoundaryProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md border-destructive/50 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle
              aria-hidden="true"
              className="h-5 w-5 text-destructive"
            />
            <CardTitle>Algo deu errado</CardTitle>
          </div>
          <CardDescription>
            Ocorreu um erro inesperado ao carregar esta página. Você pode tentar
            de novo ou voltar para o início.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="break-words font-mono text-muted-foreground text-sm">
              {error.message || "Erro desconhecido"}
            </p>
            {error.digest && (
              <p className="mt-2 font-mono text-muted-foreground text-xs">
                Código: {error.digest}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={reset} type="button">
              <RefreshCcw aria-hidden="true" />
              Tentar de novo
            </Button>
            <Button asChild className="flex-1" variant="outline">
              <Link href="/dashboard">
                <Home aria-hidden="true" />
                Voltar para o início
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
