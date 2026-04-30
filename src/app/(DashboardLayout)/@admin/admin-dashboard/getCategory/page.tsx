import { getCategory } from "@/actions/category.action";
import CategoryTable from "@/components/modules/dashboard/admin/CategoryTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react";

export default async function GetCategory() {
  const { data } = await getCategory();
  const categories = data?.data || [];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold tracking-tight">Category Management</h2>
          </div>
          <p className="text-muted-foreground">
            Organize and manage meal categories for your platform.
          </p>
        </div>
        
        <Link href="/admin-dashboard/createCategory">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 transition-all active:scale-95">
            <Plus className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </Link>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm transition-all overflow-hidden">
        <CategoryTable category={categories} />
      </div>
    </div>
  );
}