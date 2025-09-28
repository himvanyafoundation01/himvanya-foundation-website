"use server";

import cloudinary from "./cloudinary";

export async function uploadImage(fileData: string) {
  try {
    const result = await cloudinary.uploader.upload(fileData, {
      folder: "my_uploads", // change folder if needed
    });
    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
