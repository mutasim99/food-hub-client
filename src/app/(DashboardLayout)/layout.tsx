import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Role } from "@/constants/Role";
import { userService } from "@/services/user.service";

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
      <AppSidebar user={userInfo.user} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.user.role === Role.ADMIN
            ? admin
            : userInfo.user.role === Role.PROVIDER
            ? provider
            : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
