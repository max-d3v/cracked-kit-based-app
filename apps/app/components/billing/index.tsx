"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@workspace/data-layer/orpc.tanstack";
import { PricingCard } from "@workspace/payment/client";
import { PLANS } from "@workspace/payment/config";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { showErrorToast } from "@/lib/errors";
import { CurrentPlanCard } from "./current-plan-card";
import { WebhookStatus } from "./webhook-status";

export function BillingContent() {
  const { data: subscriptionData } = useSuspenseQuery(
    orpc.billing.getSubscription.queryOptions()
  );

  // These two own their error UX (per-error-code messaging + redirect below),
  // so opt out of the global error toast.
  const checkout = useMutation(
    orpc.billing.createCheckoutSession.mutationOptions({
      meta: { silent: true },
    })
  );
  const billingPortal = useMutation(
    orpc.billing.createBillingPortalSession.mutationOptions({
      meta: { silent: true },
    })
  );

  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [showWebhookWarning, setShowWebhookWarning] = useState(true);

  const handleUpgrade = async (priceId: string) => {
    setSelectedPriceId(priceId);
    try {
      const result = await checkout.mutateAsync({ priceId });
      window.location.href = result.url;
    } catch (error) {
      showErrorToast(error as Error, "Não foi possível iniciar o pagamento");
    }
  };

  const handleManageBilling = async () => {
    try {
      const result = await billingPortal.mutateAsync({});
      window.location.href = result.url;
    } catch (error) {
      const err = error as Error & { code?: string };
      const errorCode = err?.code;
      const errorMessage =
        err?.message || "Não foi possível abrir o portal de cobrança";

      if (errorCode === "NO_PREFERENCES") {
        showErrorToast(
          new Error(errorMessage),
          "Configuração da conta necessária"
        );
      } else if (errorCode === "NO_STRIPE_CUSTOMER") {
        showErrorToast(
          new Error("Assine um plano primeiro para gerenciar sua cobrança."),
          "Nenhuma assinatura ativa"
        );
      } else if (errorCode === "PORTAL_NOT_ACTIVATED") {
        showErrorToast(
          new Error(
            "O portal de cobrança ainda não está disponível. Fale com o suporte."
          ),
          "Portal indisponível"
        );
      } else {
        showErrorToast(err, "Não foi possível abrir o portal de cobrança");
      }
    }
  };

  const currentPlan = subscriptionData.plan ?? "free";
  const subscription = subscriptionData.subscription;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {showWebhookWarning && process.env.NODE_ENV === "development" && (
        <WebhookStatus onDismiss={() => setShowWebhookWarning(false)} />
      )}

      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-primary p-3">
          <CreditCard className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-3xl">Assinatura</h1>
          <p className="text-muted-foreground">
            Gerencie sua assinatura e suas configurações de cobrança
          </p>
        </div>
      </div>

      <CurrentPlanCard
        currentPlan={currentPlan}
        loading={billingPortal.isPending}
        onManageBilling={handleManageBilling}
        subscription={subscription}
      />

      <div>
        <h2 className="mb-4 font-bold text-2xl">Planos disponíveis</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <PricingCard
              current={currentPlan === plan.id}
              key={plan.id}
              loading={checkout.isPending && selectedPriceId === plan.priceId}
              onSelect={plan.priceId ? handleUpgrade : undefined}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
