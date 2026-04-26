"use server";

import { profileService } from "@/services/profile.service";

export const getMyProfile = async () => {
  return await profileService.getMtProfile();
};

export const updateMyProfile = async (formData: FormData) => {
  return await profileService.updateMyProfile(formData);
};
