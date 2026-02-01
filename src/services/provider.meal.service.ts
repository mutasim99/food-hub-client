import { env } from "@/env";
import { cookies } from "next/headers";

const apiUrl = env.BACKEND_URL;
export const ProviderMealService = {
  getMyMeals: async function () {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${apiUrl}/provider-meal`);
      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-cache",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
