import { getAllUser } from "@/actions/user.action";
import UserTable from "@/components/modules/dashboard/admin/UserTable";

export default async function AllUsers() {
  const { data } = await getAllUser();

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold mb-6">
        User Management
      </h2>
      <UserTable data={data.data} />
    </div>
  );
}
