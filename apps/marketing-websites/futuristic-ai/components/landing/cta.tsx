"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid bg-grid-fade opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[100px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="size-3.5 text-blue-200" />
          <span className="font-medium text-blue-200 text-xs">
            Conecte seu Teams em 1 minuto
          </span>
        </div>

        <h2 className="font-display font-semibold text-5xl text-gradient leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          Menos tarefa,
          <br />
          <span className="text-gradient-blue">mais tempo livre.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Deixe o Catolifeito cuidar das tarefas do Teams enquanto você cuida do
          resto. Grátis para começar, sem cartão de crédito.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            aria-label="E-mail"
            placeholder="voce@email.com"
            required
            type="email"
          />
          <Button size="lg" type="submit">
            Começar
            <ArrowRight />
          </Button>
        </form>

        <p className="mt-5 text-muted-foreground text-xs">
          7 dias grátis · Sem cartão de crédito · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
