"use server";

import { publicService } from "@/services/public.service";

export const getMeals = async (filters?: any) => {
  return await publicService.getMeals(filters);
};

export const getProviders = async () => {
  return await publicService.getProviders();
};

export const getMealsById = async (id: string) => {
  return await publicService.getMealById(id);
};

export const getProvidersById = async (id: string) => {
  return await publicService.getProviderById(id);
};
