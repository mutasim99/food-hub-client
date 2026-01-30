import { env } from "@/env";
import { cookies } from "next/headers";

const sessionUrl = env.AUTH_URL;
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
};
