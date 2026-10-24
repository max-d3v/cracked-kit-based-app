import { auth } from "@workspace/auth/auth";
import { getQueryClient } from "@workspace/data-layer/hydration";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { organizationListOptions } from "@workspace/ui/hooks/server/organization";
import { Suspense } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AppSidebar } from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(organizationListOptions(auth));

  return (
    <SidebarProvider>
      <Suspense fallback={<div>Carregando…</div>}>
        <AppSidebar />
      </Suspense>
      <SidebarInset className="min-w-0">
        <DashboardHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
