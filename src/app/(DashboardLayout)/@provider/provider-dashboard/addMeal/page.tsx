import { getCategory } from "@/actions/category.action";
import CreateMealForm from "@/components/modules/dashboard/providerDashboard/CreateMealForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AddMeal() {
  const categories = await getCategory();
  const categoryList = categories?.data?.data || [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#080808] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-10 md:py-12">
        <Link
          href="/dashboard/provider/my-meal"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-orange-500 transition-colors mb-6"
        >
          <ChevronLeft size={16} /> Back to Meals
        </Link>

        <CreateMealForm categories={categoryList} />
      </div>
    </div>
  );
}
