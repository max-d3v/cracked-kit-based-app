"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ModeToggle } from "@/components/mode-toggle";

const PATH_LABELS: Record<string, string> = {
  dashboard: "Início",
  trabalhos: "Trabalhos",
  analytics: "Desempenho",
  billing: "Assinatura",
  settings: "Configurações",
  account: "Conta",
  organization: "Organização",
  organizations: "Organizações",
  profile: "Perfil",
  security: "Segurança",
  people: "Pessoas",
};

export function DashboardHeader() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbs = useMemo(
    () =>
      paths
        .map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const label =
            PATH_LABELS[path] ?? path.charAt(0).toUpperCase() + path.slice(1);
          const isLast = index === paths.length - 1;

          return { href, label, isLast };
        })
        // Users without an organization get a literal "null" slug.
        .filter((_, index) => !(index === 0 && paths[0] === "null")),
    [paths]
  );

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator className="mr-2 h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div className="flex items-center gap-2" key={crumb.href}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
