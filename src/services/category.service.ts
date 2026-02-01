import { env } from "@/env";
import { cookies } from "next/headers";

interface GetCategoryParams {
  name: string;
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const API_URL = env.BACKEND_URL;
export const categoryService = {
  getCategory: async function (
    params?: GetCategoryParams,
    options?: ServiceOptions
  ) {
    try {
      const url = new URL(`${API_URL}/categories`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = {
          revalidate: options.revalidate,
        };
      }

      config.next = { ...config.next, tags: ["categoryName"] };

      const res = await fetch(url.toString(), {
        next: {
          tags: ["categoryName"],
        },
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  createCategory: async function (categoryName: string, categoryImage: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          name: categoryName,
          image: categoryImage,
        }),
      });

      const data = await res.json();

      if (data.error) {
        return { data: null, error: { message: "Error:Post not found" } };
      }
      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
