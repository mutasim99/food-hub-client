import { env } from "@/env";

const apiUrl = env.BACKEND_URL;

export const publicService = {
  getMeals: async (params?: {
    categoryId?: string;
    providerId?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const url = new URL(`${apiUrl}/public/meals`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const res = await fetch(url.toString(), {
      cache: "no-cache",
    });
    const json = await res.json();
    return json.data;
  },
  getMealById: async (id: string) => {
    const url = new URL(`${apiUrl}/public/meals/${id}`);
    const res = await fetch(url.toString(), {
      cache: "no-cache",
    });
    const json = await res.json();
    return json.data;
  },
  getProviders: async () => {
    const url = new URL(`${apiUrl}/public/providers`);
    const res = await fetch(url.toString(), {
      cache: "no-cache",
    });
    const json = await res.json();
    return json.data;
  },
  getProviderById: async (id: string) => {
    const url = new URL(`${apiUrl}/public/provider/${id}`);
    const res = await fetch(url.toString(), {
      cache: "no-cache",
    });
    const json = await res.json();
    return json.data;
  },
};
