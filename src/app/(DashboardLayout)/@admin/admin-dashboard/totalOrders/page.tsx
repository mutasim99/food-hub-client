import { getAllUser } from "@/actions/user.action";

export default async function TotalOrder() {
  const usersRes = await getAllUser();
  const users = usersRes?.data?.data || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Platform Overview</h2>
      <p className="text-gray-500">
        Order analytics endpoint is not connected yet. User management is active.
      </p>
      <div className="border rounded-xl p-4">
        <p className="text-sm text-gray-500">Total Registered Users</p>
        <p className="text-2xl font-bold">{users.length}</p>
      </div>
    </div>
  );
}
