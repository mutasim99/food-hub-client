import { getCategory } from "@/actions/category.action";
import CategoryCard from "@/components/ui/CategoryCard";

interface Category {
  id: string;
  name: string;
  image: string;
}
export default async function CategorySection() {
  const categoryData = await getCategory();
  const categories: Category[] = categoryData?.data?.data || [];

  return (
    <div className="py-16 px-6">
      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-8">
        What We <span className="text-orange-500">Offer</span>{" "}
      </h2>
      {categories.length === 0 ? (
        <p className="text-center text-lg font-semibold">No category found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category}></CategoryCard>
          ))}
        </div>
      )}
    </div>
  );
}
