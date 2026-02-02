import { env } from "@/env";

const apiUrl = env.BACKEND_URL;
export const customerService = {
  getProviderRestaurants: async function () {
    try {
      const url = new URL(`${apiUrl}/api/featured/providers`);
      const res = await fetch(url.toString(), {
        cache: "no-cache",
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: "Internal server error" };
    }
  },
};
