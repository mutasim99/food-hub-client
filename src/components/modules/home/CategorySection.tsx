import { getCategory } from "@/actions/category.action";
import CategoryCard from "@/components/ui/CategoryCard";

interface Category{
  id:string,
  name:string,
  image:string
}
export default async function CategorySection() {
  const categoryData = await getCategory();
  const categories:Category[] = categoryData.data.data;

  return (
    <div className="py-16 px-6">
      <h2 className="text-center text-2xl font-bold mb-8">
        Browse By Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
}
