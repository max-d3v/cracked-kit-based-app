import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#capabilities" },
      { label: "Matérias", href: "#solutions" },
      { label: "Preços", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Novidades", href: "#novidades" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Central de ajuda", href: "#ajuda" },
      { label: "Guias", href: "#guias" },
      { label: "Blog", href: "#blog" },
      { label: "Status", href: "#status" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "#sobre" },
      { label: "Trabalhe conosco", href: "#carreiras" },
      { label: "Contato", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "#privacidade" },
      { label: "Termos de uso", href: "#termos" },
      { label: "Cookies", href: "#cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-white/[0.04] border-t bg-[#06051a]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_3fr]">
          <div>
            <Link
              className="inline-flex items-center gap-2.5 font-display font-semibold text-base"
              href="/"
            >
              CATOLIFEITO
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground text-sm leading-relaxed">
              Seus trabalhos do Teams escaneados, resolvidos e enviados em seu
              nome.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Twitter, href: "#twitter", label: "Twitter" },
                { icon: Github, href: "#github", label: "GitHub" },
                { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
              ].map((social) => (
                <Link
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-muted-foreground transition-colors hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-foreground"
                  href={social.href}
                  key={social.label}
                >
                  <social.icon className="size-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-medium text-foreground text-sm">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-white/[0.04] border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-muted-foreground text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} Catolifeito. Todos os direitos
            reservados.
          </p>
          <p>
            Microsoft Teams é uma marca da Microsoft. O Catolifeito não é
            afiliado à Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
