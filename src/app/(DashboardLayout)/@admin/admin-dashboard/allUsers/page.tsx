import { getAllUser } from "@/actions/user.action";
import UserTable from "@/components/modules/dashboard/admin/UserTable";

export default async function AllUsers() {
  const { data,error } = await getAllUser();
  if (!data) {
    return <h4>Failed to load user</h4>
  }
  const user = data.data;
  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-6">
        User Management
      </h2>
      <UserTable data={user} />
    </div>
  );
}
