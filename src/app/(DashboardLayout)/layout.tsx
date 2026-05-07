import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Role } from "@/constants/Role";
import { userService } from "@/services/user.service";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
  admin,
  provider,
  customer,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}) {
  const res = await userService.getSession();
  const userInfo = res.data;
    
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo?.user} />
      <SidebarInset>
        {/* Mobile header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h2 className="text-sm font-medium text-muted-foreground">Dashboard</h2>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-6">
          {userInfo?.user?.role === Role.ADMIN
            ? admin
            : userInfo?.user?.role === Role.PROVIDER
            ? provider
            : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}