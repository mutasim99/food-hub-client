"use server";
import { ProviderMealService } from "@/services/provider.meal.service";

export const getMyMeals = async () => {
  return await ProviderMealService.getMyMeals();
};

export const updateMeal = async (mealId: string, formData: FormData) => {
  const result = await ProviderMealService.updateMeal(mealId, formData);
  if (result.error) {
    return{
      success: false,
      message: result.error.message || "Failed to update meal",
    }
  }
  return result.data;
}

export const deleteMyMeals = async (id: string) => {
  const result = await ProviderMealService.deleteMyMeals(id);
  if (result.error) {
    throw new Error(result.error.message || "Failed to delete meal");
  }
  return result.data;
};

export const getProviderOrder = async () => {
  return await ProviderMealService.getProviderOrders();
};

export const updateProviderOrderStatus = async (
  orderId: string,
  status: string
) => {
  return await ProviderMealService.updateProviderOrders(orderId, status);
};
