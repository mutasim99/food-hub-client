import CategorySection from "@/components/modules/home/CategorySection";
import FeaturedRestaurant from "@/components/modules/home/FeaturedRestaurant";
import HeroBanner from "@/components/modules/home/HeroBanner";
import PopularMeals from "@/components/modules/home/PopularMeals";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <PopularMeals/>
      <FeaturedRestaurant/>
    </div>
  );
}
