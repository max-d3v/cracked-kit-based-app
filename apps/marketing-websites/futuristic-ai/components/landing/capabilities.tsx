import { Brain, Plug, ScanSearch, Send } from "lucide-react";
import BorderGlow from "@/components/border-glow";
import { Badge } from "@/components/ui/badge";

const capabilities = [
  {
    icon: Plug,
    title: "Conecte seu Teams",
    description:
      "Entre com sua conta Microsoft. Leva menos de um minuto e não precisa instalar nada.",
  },
  {
    icon: ScanSearch,
    title: "Escaneamos suas tarefas",
    description:
      "Lemos enunciados, anexos e prazos de todas as suas turmas assim que a tarefa é publicada.",
  },
  {
    icon: Brain,
    title: "Resolvemos cada uma",
    description:
      "Listas, redações, questionários e código, resolvidos no formato que o professor pediu.",
  },
  {
    icon: Send,
    title: "Enviamos em seu nome",
    description:
      "A entrega é feita direto no Teams antes do prazo. Você só recebe o aviso de que deu tudo certo.",
  },
];

export function Capabilities() {
  return (
    <section className="relative py-24 md:py-32" id="capabilities">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="blue">Como funciona</Badge>
          <h2 className="mt-5 font-display font-semibold text-4xl text-gradient tracking-tight md:text-5xl">
            Do Teams ao entregue, no automático
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Quatro passos que acontecem sozinhos, toda vez que um professor
            publica uma tarefa nova.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <BorderGlow
                backgroundColor="#080a18"
                borderRadius={16}
                colors={["#3b82f6", "#22d3ee", "#38bdf8"]}
                coneSpread={25}
                edgeSensitivity={30}
                glowColor="210 80 60"
                glowIntensity={0.8}
                glowRadius={30}
                key={cap.title}
              >
                <div className="group p-8">
                  <div className="relative mb-5 inline-flex">
                    <span className="absolute inset-0 rounded-lg bg-blue-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                    <span className="relative grid size-11 place-items-center rounded-lg border border-white/[0.08] bg-gradient-to-br from-blue-500/15 to-cyan-500/10">
                      <Icon
                        className="size-5 text-blue-200"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                  <h3 className="mb-2 font-display font-medium text-base text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
}
