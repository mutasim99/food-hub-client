"use server";

import { CreateMealData, MealService } from "./../services/meal.service";

export const CreateMeal = async (payload: CreateMealData) => {
  return await MealService.createMeal(payload);
};

export const getPopularMeals = async () => {
  return await MealService.getProviderMeals();
};
