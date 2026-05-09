import { getFeaturedRestaurant } from "@/actions/customer.action";
import FeaturedRestaurantCard from "@/components/sheared/FeaturedRestaurantCard";


export default async function FeaturedRestaurant() {
  const response = await getFeaturedRestaurant();
  

  const providers = response?.data?.data || [];

  if (providers.length === 0) return null;

  return (
    <FeaturedRestaurantCard providers={providers} />
  );
}