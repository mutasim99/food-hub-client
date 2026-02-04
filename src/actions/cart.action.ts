"use server";

import { cartService } from "@/services/cart.service";

export const addToCart = async (mealId: string, qty = 1) => {
  return await cartService.addToCart(mealId, qty);
};

export const getCart = async () => {
  return await cartService.getCart();
};
