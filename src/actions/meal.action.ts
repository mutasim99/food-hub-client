"use server";

import { CreateMealData, MealService } from "./../services/meal.service";

export const CreateMeal = async (formData: FormData) => {
  return await MealService.createMeal(formData);
};

export const getPopularMeals = async () => {
  return await MealService.getProviderMeals();
};
