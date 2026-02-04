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
      const json = await res.json();
      return { data: json.data ?? [], error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  deleteMyMeals: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${apiUrl}/provider-meal/${id}`);
      const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something gone wrong" } };
    }
  },
  getProviderOrders: async function () {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${apiUrl}/provider-orders`);
      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-cache",
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "something went wrong" } };
    }
  },
  updateProviderOrders: async function (orderId: string, status: string) {
    try {
      const cookieStore = await cookies();

      const url = new URL(`${apiUrl}/provider-orders/${orderId}/status`);
      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: data.error || "Update failed" };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return {data:null, error:"Something went wrong"}
    }
  },
};
