import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Play,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroBg } from "@/components/ui/hero-bg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBg />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-40">
        <div className="flex flex-col items-center text-center">
          <Link
            className="group relative mb-8 inline-flex items-center gap-2 rounded-full py-1 pr-4 pl-1"
            href="#capabilities"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3 py-0.5 font-medium text-[11px] text-blue-200">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-blue-400" />
              </span>
              NOVO
            </span>
            <span className="font-medium text-sm text-white/90">
              Integração com Microsoft Teams no ar
            </span>
            <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1 className="max-w-4xl text-balance font-display font-semibold text-5xl text-gradient leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
            Seus trabalhos do Teams,
            <br />
            <span className="text-gradient-blue">já estão feitos.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground leading-relaxed md:text-xl">
            Conecte seu Microsoft Teams e o Catolifeito escaneia suas tarefas,
            resolve cada uma e envia em seu nome — antes do prazo, sem você
            levantar um dedo.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="#signup">
              <Button size="lg">
                Conectar meu Teams
                <ArrowRight />
              </Button>
            </Link>
            <Link href="#capabilities">
              <Button size="lg" variant="secondary">
                <Play className="size-3.5 fill-current" />
                Ver como funciona
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-muted-foreground text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Integra com Microsoft Teams
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Entrega antes do prazo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />7 dias
              grátis
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="pointer-events-none absolute -top-12 left-1/2 h-24 w-2/3 -translate-x-1/2 bg-blue-500/30 blur-3xl" />

          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-1.5 shadow-[0_30px_80px_-20px_rgba(59,130,246,0.4)] backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#080a18]">
              <div className="flex items-center justify-between gap-2 border-white/[0.05] border-b bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  catolifeito.app / tarefas
                </div>
                <div className="w-12" />
              </div>

              <div className="grid grid-cols-12 gap-px bg-white/[0.04]">
                <aside className="col-span-3 hidden flex-col gap-1 bg-[#080a18] p-4 md:flex">
                  {[
                    { icon: ClipboardList, label: "Tarefas", count: 12 },
                    { icon: Users, label: "Turmas", count: 6 },
                    { icon: BookOpen, label: "Matérias", count: 9 },
                    { icon: Send, label: "Entregues", count: 48 },
                  ].map((item) => (
                    <div
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-white/[0.03]"
                      key={item.label}
                    >
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <item.icon className="size-3.5" />
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] text-white/40">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </aside>

                <main className="col-span-12 space-y-4 bg-[#080a18] p-6 md:col-span-9">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-medium text-foreground text-sm">
                        Lista 3 — Cálculo I
                      </div>
                      <div className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        Resolvendo · 3 tarefas na fila
                      </div>
                    </div>
                    <Badge variant="blue">
                      <Sparkles className="size-3" />
                      IA
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        action: "sincronizar_teams",
                        desc: "6 turmas sincronizadas · 3 tarefas novas",
                        ms: 142,
                      },
                      {
                        action: "escanear_tarefa",
                        desc: "Encontrou “Lista 3 — Derivadas” · prazo amanhã",
                        ms: 318,
                      },
                      {
                        action: "resolver",
                        desc: "12 questões resolvidas passo a passo",
                        ms: 612,
                      },
                      {
                        action: "enviar",
                        desc: "Entregue no Teams em seu nome",
                        ms: 89,
                      },
                    ].map((step, i) => (
                      <div
                        className="flex items-center gap-3 rounded-md border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 font-mono text-xs"
                        key={step.action}
                      >
                        <span className="text-white/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-blue-300">{step.action}</span>
                        <span className="flex-1 truncate text-muted-foreground">
                          {step.desc}
                        </span>
                        <span className="text-emerald-400">{step.ms}ms</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      {
                        label: "Entregues hoje",
                        value: "7",
                        trend: "+3",
                      },
                      { label: "Tempo médio", value: "4 min", trend: "-12%" },
                      { label: "No prazo", value: "100%", trend: "+0" },
                    ].map((stat) => (
                      <div
                        className="rounded-md border border-white/[0.05] bg-white/[0.02] p-3"
                        key={stat.label}
                      >
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </div>
                        <div className="mt-1 flex items-baseline gap-1.5">
                          <span className="font-display font-medium text-foreground text-lg">
                            {stat.value}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400">
                            {stat.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            </div>
          </div>

          <div className="absolute top-1/3 -left-6 hidden rounded-xl border border-white/[0.08] bg-[#0a0c1f]/90 p-3 backdrop-blur-xl lg:block">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-md bg-cyan-500/15">
                <CalendarCheck className="size-4 text-cyan-300" />
              </span>
              <div>
                <div className="font-medium text-foreground text-xs">
                  Prazos
                </div>
                <div className="font-mono text-[10px] text-emerald-400">
                  0 atrasados esta semana
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2/3 -right-6 hidden rounded-xl border border-white/[0.08] bg-[#0a0c1f]/90 p-3 backdrop-blur-xl lg:block">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-md bg-sky-500/15">
                <ClipboardList className="size-4 text-sky-300" />
              </span>
              <div>
                <div className="font-medium text-foreground text-xs">
                  12 tarefas
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  3 resolvendo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
