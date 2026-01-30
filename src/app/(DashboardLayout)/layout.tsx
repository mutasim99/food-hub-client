import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Role } from "@/constants/Role";

export default function DashboardLayout({
  admin,
  provider,
  customer,
}: {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}) {
  const userInfo = {
    role: Role.ADMIN,
  };
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Role.ADMIN
            ? admin
            : userInfo.role === Role.PROVIDER
            ? provider
            : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
