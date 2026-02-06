import { env } from "@/env";
import { cookies } from "next/headers";

const apiUrl = env.BACKEND_URL;

export const reviewService = {
  addReview: async function (mealId: string, rating: number, comment: string) {
    const cookieStore = await cookies();
    const url = new URL(`${apiUrl}/reviews`);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ mealId, rating, comment }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error);
    }
    return json.data;
  },
  getReviews: async function (mealId: string) {
    const url = new URL(`${apiUrl}/reviews/${mealId}`);
    const res = await fetch(url.toString());
    return res.json();
  },
};
