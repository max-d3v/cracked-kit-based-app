import type { Metadata } from "next";
import { Capabilities } from "@/components/landing/capabilities";
import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";

import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Testimonial } from "@/components/landing/testimonial";
import { UseCases } from "@/components/landing/use-cases";

export const metadata: Metadata = {
  title: "Catolifeito — Seus trabalhos do Teams, já feitos",
  description:
    "Conecte seu Microsoft Teams e o Catolifeito escaneia suas tarefas, resolve cada uma e envia em seu nome — antes do prazo.",
  keywords: [
    "Catolifeito",
    "Microsoft Teams",
    "tarefas do Teams",
    "trabalhos escolares",
    "lição de casa",
    "IA para estudantes",
    "entrega automática",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Catolifeito",
    title: "Catolifeito — Seus trabalhos do Teams, já feitos",
    description:
      "Escaneia suas tarefas do Teams, resolve e envia em seu nome. Você só acompanha.",
  },
};

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Capabilities />

      <UseCases />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
