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
      if (!res.ok) {
        return { data: null, error: data.error || "Order failed" };
      }
      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getTotalOrders: async function (params: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const cookieStore = await cookies();
    const url = new URL(`${apiUrl}/admin-order`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value.toString());
      }
    });
    const res = await fetch(url.toString(), {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-cache",
    });
    const json = await res.json();
    return {
      data: json.data,
      meta: json.meta,
      error: null,
    };
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
    const json = await res.json();
    return { data: json.data, error: null };
  },
  cancelOrder: async (id: string) => {
    const cookieStore = await cookies();
    const url = new URL(`${apiUrl}/my-orders/${id}/cancel`);
    const res = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    const data = await res.json();
    return data;
  },
};
