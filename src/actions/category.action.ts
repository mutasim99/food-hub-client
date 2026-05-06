"use server";

import { categoryService } from "@/services/category.service";
import { updateTag } from "next/cache";

export const getCategory = async () => {
  return await categoryService.getCategory();
};

export const createCategory = async (formData:FormData) => {
  const res = await categoryService.createCategory(formData);
  if (res.data) {
    updateTag("categoryData");
  }
  return res;
};
