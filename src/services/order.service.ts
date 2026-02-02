import { env } from "@/env";
import { cookies } from "next/headers";

export interface CrateOrderPayload {
  address: string;
  items: {
    mealId: string;
    qty: number;
  }[];
}
const apiUrl = env.BACKEND_URL;
export const orderServices = {
  createOrder: async function (orderData: CrateOrderPayload) {
    try {
      const url = new URL(`${apiUrl}/create-order`);
      const cookieStore = await cookies();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getMyOrder: async function () {
    const cookieStore = await cookies();
    const url = new URL(`${apiUrl}/my-orders`);
    const res = await fetch(url.toString(), {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    });
    return res.json();
  },
  getOrderById: async function (id: string) {
    const cookieStore = await cookies();
    const url = new URL(`${apiUrl}/my-orders/${id}`);
    const res = await fetch(url.toString(), {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    });
    const json= await res.json();
    return {data:json.data, error:null}
  },
};
