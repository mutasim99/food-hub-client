'use server'
import { CreateProvider, customerService } from "@/services/customer.service";

export const getFeaturedRestaurant = async () => {
  return await customerService.getProviderRestaurants();
};

export const becomeAProvider = async (formData: FormData) => {
  return await customerService.becomeAProvider(formData);
};