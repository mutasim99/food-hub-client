import { getCategory } from "@/actions/category.action";
import CategoryTable from "@/components/modules/dashboard/admin/CategoryTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function GetCategory() {
  const { data } = await getCategory();

  return (
    <div className="w-full px-6 mx-auto mt-2">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font font-semibold">Category Management</h2>
        <Link href="/admin-dashboard/createCategory">
          <Button className="bg-orange-500 hover:cursor-pointer text-white">
            <Plus></Plus> Add New
          </Button>
        </Link>
      </div>
      <div>
      <CategoryTable category={data.data} />
      </div>
    </div>
  );
}
