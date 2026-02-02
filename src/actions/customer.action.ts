import { customerService } from "@/services/customer.service";

export const getFeaturedRestaurant = async () => {
   return await customerService.getProviderRestaurants()
};
