import { getCategory } from "@/actions/category.action";
import CategoryCard from "@/components/ui/CategoryCard";
import { LayoutGrid } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
}

export default async function CategorySection() {
  const categoryData = await getCategory();
  const categories: Category[] = categoryData?.data?.data || [];

  return (
    <section className="py-20 px-6 bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 overflow-hidden relative">

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-[0.2em]">
              <LayoutGrid size={16} />
              <span>Cuisines</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              What We <span className="text-orange-500">Offer</span>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xs text-sm leading-relaxed">
            From spicy street food to gourmet dinners, explore our diverse categories tailored for your taste.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-400 font-medium">No categories available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group transition-transform duration-500 hover:-translate-y-2">
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}