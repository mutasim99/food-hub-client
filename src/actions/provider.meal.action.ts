"use server";
import { ProviderMealService } from "@/services/provider.meal.service";

export const getMyMeals = async () => {
  return await ProviderMealService.getMyMeals();
};
