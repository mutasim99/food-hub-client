import { env } from "@/env";
import { getCookieHeader } from "@/lib/forwardCookies";
import { cookies } from "next/headers";

export interface CreateMealData {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  image: string;
}

const apiUrl = env.BACKEND_URL;
export const MealService = {
  createMeal: async function (payload: CreateMealData) {
    try {
      const url = new URL(`${apiUrl}/api/add-meals`);
      const cookieHeader = await getCookieHeader();
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getProviderMeals: async () => {
    try {
      const url = new URL(`${apiUrl}/api/meals/popular`);
      const res = await fetch(url.toString(), {
        cache: "no-cache",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
