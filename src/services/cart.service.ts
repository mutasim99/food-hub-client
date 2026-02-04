import { env } from "@/env";
import { cookies } from "next/headers";

interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}

const apiUrl = env.BACKEND_URL;

export const cartService = {
  addToCart: async function (mealId: string, qty = 1) {
    const url = new URL(`${apiUrl}/cart/add`);
    const cookieStore = await cookies();
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ mealId, qty }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to add to cart");
    }
    return json.data;
  },

  getCart: async function (options?: ServiceOption) {
    const url = new URL(`${apiUrl}/cart`);
    const cookieStore = await cookies();

    const config: RequestInit = {};
    if (options?.cache) {
      config.cache = options.cache;
    }
    if (options?.revalidate) {
      config.next = { revalidate: options.revalidate };
    }

    config.next = { ...config.next, tags: ["cartItems"] };

    const res = await fetch(url.toString(), {
      headers: {
        cookie: cookieStore.toString(),
      },
      next: {
        tags: ["cartItems"],
      },
      cache: "no-cache",
    });
    return res.json();
  },
};
