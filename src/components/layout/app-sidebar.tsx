"use client";

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
  SidebarHeader, // Added this
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Role } from "@/constants/Role";
import { adminRoutes } from "@/routes/adminRoutes";
import { providerRoutes } from "@/routes/providerRoutes";
import { customersRoutes } from "@/routes/customer";
import { Routes } from "@/types";
import { LogOut, UserRoundPen, UtensilsCrossed } from "lucide-react";

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
      {/* --- Logo / Header Section --- */}
      <SidebarHeader className="border-b p-4">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
            <UtensilsCrossed size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-orange-500">
            FoodHub
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex-1">
          {routes.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton asChild>
                        <Link href={subItem.url}>{subItem.title}</Link>
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
                <Link href="/profile">
                  <UserRoundPen size={18} /> <span>My Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-destructive hover:text-destructive">
                <LogOut size={18} /> <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
