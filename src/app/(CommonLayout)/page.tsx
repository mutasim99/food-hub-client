import CategorySection from "@/components/modules/home/CategorySection";
import HeroBanner from "@/components/modules/home/HeroBanner";
import PopularMeals from "@/components/modules/home/PopularMeals";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <PopularMeals/>
    </div>
  );
}
