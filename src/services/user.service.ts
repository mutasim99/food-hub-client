import { env } from "@/env";
import { cookies } from "next/headers";

interface GetUserParams {
  name?: string;
  email?: string;
}

interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}

const sessionUrl = env.AUTH_URL;
const apiUrl = env.BACKEND_URL;
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${sessionUrl}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-cache",
      });
      const session = await res.json();
      if (!session) {
        return { data: null, error: "Something went wrong" };
      }
      return { data: session, error: null };
    } catch (error) {
      return { data: null, error: "Something went wrong" };
    }
  },
  getAllUser: async function (params?: GetUserParams, options?: ServiceOption) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${apiUrl}/users-admin`);
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
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["UserName"] };

      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        next: {
          tags: ["UserName"],
        },
      });

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: error || "Failed to retrieved users" },
      };
    }
  },
  updateUserRole: async function (id: string, role: string) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${apiUrl}/users-admin/${id}`);
      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      return { error: "Failed to update role" };
    }
  },
};
