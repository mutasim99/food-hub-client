import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Role } from "@/constants/Role";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { customersRoutes } from "@/routes/customer";
import { Routes } from "@/types";
import { LogOut, UserRoundPen } from "lucide-react";



export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Routes[] = [];

  switch (user?.role) {
    case Role.ADMIN:
      routes = adminRoutes;
      break;
    case Role.PROVIDER:
      routes = providerRoutes;
      break;
    case Role.CUSTOMER:
      routes = customersRoutes;
      break;
    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <div className="flex-1">
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        </div>

        {/* Bottom section */}
        <div className="mt-auto border-t p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/profile"><UserRoundPen /> My Profile</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
              <LogOut /> Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
