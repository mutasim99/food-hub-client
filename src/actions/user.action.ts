"use server";
import { userService } from "@/services/user.service";

export const getAllUser = async () => {
  return await userService.getAllUser();
};

export const updateUserRole = async (id: string, role: string) => {
  return await userService.updateUserRole(id, role);
};
