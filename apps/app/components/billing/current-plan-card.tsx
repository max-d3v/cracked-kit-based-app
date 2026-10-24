"use client";

import { getPlanById } from "@workspace/payment/config";
import type { StripeSubscription } from "@workspace/types/payments/billing";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";

interface CurrentPlanCardProps {
  readonly currentPlan: string;
  readonly loading: boolean;
  readonly onManageBilling: () => void;
  readonly subscription: StripeSubscription | null | undefined;
}

export function CurrentPlanCard({
  currentPlan,
  subscription,
  onManageBilling,
  loading,
}: CurrentPlanCardProps) {
  const plan = getPlanById(currentPlan);

  if (!plan) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Plano atual
            </CardTitle>
            <CardDescription>Sua assinatura ativa</CardDescription>
          </div>
          {subscription && (
            <Button
              disabled={loading}
              onClick={onManageBilling}
              size="sm"
              variant="outline"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </>
              ) : (
                "Gerenciar assinatura"
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="font-bold text-2xl">{plan.name}</h3>
                {plan.popular && <Badge variant="default">Mais popular</Badge>}
              </div>
              <p className="font-bold text-3xl">
                ${plan.price}
                <span className="font-normal text-base text-muted-foreground">
                  /mês
                </span>
              </p>
            </div>

            {subscription && subscription.status === "active" && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {subscription.cancelAtPeriodEnd
                    ? `Cancela em ${formatDate(subscription.currentPeriodEnd)}`
                    : `Renova em ${formatDate(subscription.currentPeriodEnd)}`}
                </span>
              </div>
            )}

            {subscription?.status && subscription.status !== "active" && (
              <div className="text-sm">
                <Badge
                  variant={
                    subscription.status === "trialing"
                      ? "default"
                      : "destructive"
                  }
                >
                  {subscription.status}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
