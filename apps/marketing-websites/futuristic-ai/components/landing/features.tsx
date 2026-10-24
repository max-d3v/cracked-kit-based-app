import {
  BarChart3,
  Boxes,
  Database,
  Gauge,
  Network,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Boxes,
    title: "Entende o enunciado",
    description:
      "Lê textos, PDFs e anexos da tarefa para saber exatamente o que o professor está pedindo.",
    gradient: "from-blue-500/15 to-transparent",
    iconBg: "bg-blue-500/15 text-blue-200",
  },
  {
    icon: Network,
    title: "Todas as turmas",
    description:
      "Acompanha todas as suas turmas do Teams ao mesmo tempo e resolve várias tarefas em paralelo.",
    gradient: "from-cyan-500/15 to-transparent",
    iconBg: "bg-cyan-500/15 text-cyan-200",
  },
  {
    icon: Database,
    title: "Aprende seu estilo",
    description:
      "Usa suas entregas anteriores para escrever do seu jeito, com o seu vocabulário.",
    gradient: "from-sky-500/15 to-transparent",
    iconBg: "bg-sky-500/15 text-sky-200",
  },
  {
    icon: Gauge,
    title: "Antes do prazo",
    description:
      "Tarefas novas são resolvidas e enviadas com folga, para nada ficar para a última hora.",
    gradient: "from-amber-500/15 to-transparent",
    iconBg: "bg-amber-500/15 text-amber-200",
  },
  {
    icon: ShieldCheck,
    title: "Seus dados protegidos",
    description:
      "Acesso autorizado pela própria Microsoft, sem guardar sua senha. Revogue quando quiser.",
    gradient: "from-emerald-500/15 to-transparent",
    iconBg: "bg-emerald-500/15 text-emerald-200",
  },
  {
    icon: BarChart3,
    title: "Histórico de entregas",
    description:
      "Veja tudo o que foi resolvido e enviado, com a resposta completa de cada tarefa.",
    gradient: "from-blue-500/15 to-transparent",
    iconBg: "bg-blue-500/15 text-blue-200",
  },
];

export function Features() {
  return (
    <section
      className="relative border-white/[0.04] border-y bg-[#08071a] py-24 md:py-32"
      id="features"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Badge variant="cyan">Por que Catolifeito</Badge>
            <h2 className="mt-5 max-w-xl font-display font-semibold text-4xl text-gradient tracking-tight md:text-5xl">
              Feito para quem tem mais o que fazer.
            </h2>
          </div>
          <p className="max-w-md text-lg text-muted-foreground leading-relaxed lg:justify-self-end">
            Você foca no que importa. O Catolifeito cuida das tarefas, dos
            prazos e das entregas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b ${feature.gradient} p-6 transition-all hover:border-white/[0.12]`}
                key={feature.title}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-32 left-1/2 size-64 -translate-x-1/2 rounded-full bg-white/[0.04] opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
                />
                <div className="relative">
                  <span
                    className={`mb-4 inline-grid size-10 place-items-center rounded-lg border border-white/[0.08] ${feature.iconBg}`}
                  >
                    <Icon className="size-4.5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mb-2 font-display font-medium text-base text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
