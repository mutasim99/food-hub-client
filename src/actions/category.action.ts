"use server";

import { categoryService } from "@/services/category.service";
import { updateTag } from "next/cache";

export const getCategory = async () => {
  return await categoryService.getCategory();
};

export const createCategory = async (
  categoryName: string,
  categoryImage: string
) => {
  const res = await categoryService.createCategory(categoryName, categoryImage);
  updateTag("categoryData");
  return res;
};
