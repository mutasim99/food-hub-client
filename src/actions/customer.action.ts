'use server'
import { CreateProvider, customerService } from "@/services/customer.service";

export const getFeaturedRestaurant = async () => {
  return await customerService.getProviderRestaurants();
};

export const becomeAProvider = async (payload: CreateProvider) => {
  return await customerService.becomeAProvider(payload);
};
