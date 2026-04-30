import { env } from "@/env";
import { Profile } from "@/types/profile.type";
import { cookies } from "next/headers";

const apiUrl = env.BACKEND_URL;
console.log(apiUrl);


export const profileService = {
  getMyProfile: async (): Promise<{
    data: Profile | null;
    error: String | null;
  }> => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${apiUrl}/profile/me`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();
      

      if (!res.ok) {
        return {
          data: null,
          error: result.error || "Failed to fetched",
        };
      }
      return {
        data: result.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: "Something went wrong",
      };
    }
  },

  updateMyProfile: async (
    formData: FormData
  ): Promise<{
    data: Profile | null;
    error: String | null;
  }> => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${apiUrl}/profile/me`, {
        method: "PATCH",
        headers: {
          cookie: cookieStore.toString(),
        },
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: result.error || "Failed to fetched",
        };
      }

      return {
        data: result.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: "something went wrong",
      };
    }
  },
};
