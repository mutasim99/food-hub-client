import { getPopularMeals } from "@/actions/meal.action";
import PopularMealCard from "@/components/ui/PopularMealCard";

export default async function PopularMeals() {

  const response = await getPopularMeals();
  const popularMeals = response?.data?.data || [];

  if (popularMeals.length === 0) {
    return null; 
  }

  return (
    <div className="bg-white dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <PopularMealCard meals={popularMeals} />
      </div>
    </div>
  );
}