import { getCategory } from "@/actions/category.action";
import { getAllUser } from "@/actions/user.action";

export default async function AdminDashboardPage() {
  const usersRes = await getAllUser();
  const categoryRes = await getCategory();

  const users = usersRes?.data?.data || [];
  const categories = categoryRes?.data?.data || [];
  const providerCount = users.filter((user: any) => user.role === "PROVIDER").length;
  const customerCount = users.filter((user: any) => user.role === "CUSTOMER").length;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="text-2xl font-bold">{customerCount}</p>
        </div>
        <div className="border rounded-xl p-4">
          <p className="text-sm text-gray-500">Providers</p>
          <p className="text-2xl font-bold">{providerCount}</p>
        </div>
        <div className="border rounded-xl p-4 md:col-span-3">
          <p className="text-sm text-gray-500">Categories</p>
          <p className="text-2xl font-bold">{categories.length}</p>
        </div>
      </div>
    </div>
  );
}
