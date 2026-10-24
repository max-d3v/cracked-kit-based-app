import {
  ArrowUpRight,
  Calculator,
  CodeXml,
  ListChecks,
  PenLine,
} from "lucide-react";
import BorderGlow from "@/components/border-glow";
import { Badge } from "@/components/ui/badge";

const useCases = [
  {
    icon: Calculator,
    title: "Exatas",
    description:
      "Listas de exercícios de matemática, física e química resolvidas passo a passo, com cálculos e justificativas.",
    metrics: [
      { label: "Questões por lista", value: "50+" },
      { label: "Tempo médio", value: "4 min" },
    ],
  },
  {
    icon: PenLine,
    title: "Redação & humanas",
    description:
      "Redações, resenhas e resumos escritos no seu tom, respeitando o enunciado e o limite de palavras.",
    metrics: [
      { label: "Normas", value: "ABNT" },
      { label: "Ajustes", value: "∞" },
    ],
  },
  {
    icon: CodeXml,
    title: "Programação",
    description:
      "Exercícios de código resolvidos, testados e entregues com os arquivos no formato pedido.",
    metrics: [
      { label: "Linguagens", value: "20+" },
      { label: "Código testado", value: "100%" },
    ],
  },
  {
    icon: ListChecks,
    title: "Questionários",
    description:
      "Formulários e questionários vinculados à tarefa respondidos antes de o prazo fechar.",
    metrics: [
      { label: "Entregas no prazo", value: "100%" },
      { label: "Atrasos", value: "0" },
    ],
  },
];

export function UseCases() {
  return (
    <section className="relative py-24 md:py-32" id="solutions">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="sky">Matérias</Badge>
          <h2 className="mt-5 font-display font-semibold text-4xl text-gradient tracking-tight md:text-5xl">
            Qualquer tarefa, qualquer matéria.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Do cálculo à redação, o Catolifeito entende o enunciado e entrega no
            formato que o professor espera.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <BorderGlow
                backgroundColor="#080a18"
                borderRadius={16}
                colors={["#3b82f6", "#22d3ee", "#38bdf8"]}
                coneSpread={25}
                edgeSensitivity={30}
                glowColor="210 80 60"
                glowIntensity={0.8}
                glowRadius={35}
                key={useCase.title}
              >
                <div className="group relative flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
                      <Icon
                        className="size-5 text-foreground"
                        strokeWidth={1.5}
                      />
                    </span>
                    <ArrowUpRight
                      className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="mt-6 font-display font-medium text-foreground text-xl">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 max-w-md text-muted-foreground text-sm leading-relaxed">
                    {useCase.description}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-white/[0.06] border-t pt-6">
                    {useCase.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="font-display font-semibold text-3xl text-gradient-blue">
                          {metric.value}
                        </div>
                        <div className="mt-1 text-muted-foreground text-xs uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
