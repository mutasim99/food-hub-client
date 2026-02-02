import { env } from "@/env";
import { cookies } from "next/headers";

export interface CreateProvider {
  shopName: string;
  address: string;
  phone: string;
  image: string;
}

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
  becomeAProvider: async function (payload: CreateProvider) {
    try {
      const url = new URL(`${apiUrl}/create-profile`);
      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: "Internal server error" };
    }
  },
};
