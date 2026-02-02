import CategorySection from "@/components/modules/home/CategorySection";
import FeaturedRestaurant from "@/components/modules/home/FeaturedRestaurant";
import HeroBanner from "@/components/modules/home/HeroBanner";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PopularMeals from "@/components/modules/home/PopularMeals";
import Footer from "@/components/sheared/Footer";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategorySection />
      <PopularMeals/>
      <FeaturedRestaurant/>
      <HowItWorks/>
      <Footer/>
    </div>
  );
}
