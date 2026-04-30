import { getAllUser } from "@/actions/user.action";
import UserTable from "@/components/modules/dashboard/admin/UserTable";
import { UserCog } from "lucide-react";

export default async function AllUsers() {
  const { data, error } = await getAllUser();

  if (!data) {
    return (
      <div className="flex h-112.5 items-center justify-center rounded-xl border border-dashed">
        <p className="text-muted-foreground text-sm">
          Failed to load users. Please try again.
        </p>
      </div>
    );
  }

  const users = data.data;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <UserCog className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold tracking-tight">
              User Management
            </h2>
          </div>
          <p className="text-muted-foreground">
            Manage your platform users, update their roles, and monitor status.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm transition-all overflow-hidden">
        <UserTable data={users} />
      </div>
    </div>
  );
}
