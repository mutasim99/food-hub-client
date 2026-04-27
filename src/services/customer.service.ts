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
  becomeAProvider: async function (formData: FormData) {
    try {
      const url = new URL(`${apiUrl}/create-profile`);
      const cookieStore = await cookies();
  
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          cookie: cookieStore.toString(), 
        },
        body: formData, 
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return {
          data: null,
          error: data.error || "Failed to create provider",
        };
      }
  
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Internal server error" };
    }
  }
};
