"use server";

import { reviewService } from "@/services/review.service";

export const addReview = async (
  mealId: string,
  rating: number,
  comment: string
) => {
  return await reviewService.addReview(mealId, rating, comment);
};

export const getReview = async (mealId: string) => {
  return await reviewService.getReviews(mealId);
};
