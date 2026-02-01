"use server";
import { ProviderMealService } from "@/services/provider.meal.service";

export const getMyMeals = async () => {
  return await ProviderMealService.getMyMeals();
};

export const deleteMyMeals = async (id: string) => {
  return await ProviderMealService.deleteMyMeals(id);
};
