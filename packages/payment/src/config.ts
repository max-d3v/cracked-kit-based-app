import type { PricingPlan } from "@workspace/types/payments/pricing";
import { env } from "./keys";

export const PLANS: readonly PricingPlan[] = [
  {
    id: "free",
    name: "Grátis",
    description: "Perfeito para começar",
    price: 0,
    maxTasks: 10,
    maxUsers: 1,
    features: [
      "Até 10 trabalhos por mês",
      "Conexão com o Microsoft Teams",
      "Resolução automática dos trabalhos",
      "Suporte pela comunidade",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para quem quer zerar todos os trabalhos",
    price: 19,
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    maxTasks: -1,
    maxUsers: 5,
    popular: true,
    features: [
      "Trabalhos ilimitados",
      "Envio automático em seu nome",
      "Todas as matérias",
      "Revisão antes do envio",
      "Suporte prioritário",
      "Compartilhe com até 5 colegas",
    ],
  },
  {
    id: "enterprise",
    name: "Turma",
    description: "Plano para grupos de estudo e turmas",
    price: 49,
    priceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
    maxTasks: -1,
    maxUsers: -1,
    features: [
      "Tudo do plano Pro",
      "Membros ilimitados no grupo",
      "Painel de trabalhos da turma",
      "Prioridade na fila de resolução",
      "Atendimento dedicado",
      "Cobrança única para o grupo",
      "Login com conta da escola (SSO)",
    ],
  },
] as const;

export const getPlanById = (planId: string): PricingPlan | undefined => {
  return PLANS.find((plan) => plan.id === planId);
};

export const getPlanByPriceId = (priceId: string): PricingPlan | undefined => {
  return PLANS.find((plan) => plan.priceId === priceId);
};

export const isFreePlan = (planId: string): boolean => {
  return planId === "free";
};

export const canUpgrade = (
  currentPlan: string,
  targetPlan: string
): boolean => {
  const plans = ["free", "pro", "enterprise"];
  const currentIndex = plans.indexOf(currentPlan);
  const targetIndex = plans.indexOf(targetPlan);
  return targetIndex > currentIndex;
};
