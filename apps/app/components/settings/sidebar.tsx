"use client";

import { getOrganizationSlug } from "@workspace/auth/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { ArrowLeft, Briefcase, Shield, User, Users } from "lucide-react";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";

const navMain = [
  {
    title: "Conta",
    items: [
      {
        title: "Perfil",
        url: "account/profile",
        icon: User,
      },
      {
        title: "Segurança",
        url: "account/security",
        icon: Shield,
      },
      {
        title: "Minhas organizações",
        url: "account/organizations",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Organização",
    items: [
      {
        title: "Perfil",
        url: "organization/profile",
        icon: Briefcase,
      },
      {
        title: "Pessoas",
        url: "organization/people",
        icon: Users,
      },
    ],
  },
];

export function SettingsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const organizationSlug = getOrganizationSlug();
  const settingsBase = `/${organizationSlug}/settings`;
  const items = navMain.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      url: `${settingsBase}/${item.url}`,
    })),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Voltar para o app">
              <Link href={`/${organizationSlug}/dashboard`}>
                <ArrowLeft />
                <span>Voltar para o app</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
