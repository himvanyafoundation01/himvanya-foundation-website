"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary/uploadImage";
import { Input } from "./ui/input";
import { Loader, Loader2 } from "lucide-react";

export default function UploadImage({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await uploadImage(base64);
      console.log("Cloudinary response:", res);
      onChange(res.secure_url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <Input type="file" accept="image/*" className="bg-white" onChange={handleFileChange} />
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="mt-4 w-32 h-32 object-cover rounded-md shadow-md"
        />
      )}

      {/* Fullscreen overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-50 text-xl flex items-center justify-center bg-black/10 backdrop-blur-[1px] transition-opacity">
          <div className="flex items-center bg-white rounded-lg p-4 gap-2">
            <Loader className="w-6 h-6 text-black animate-spin" />
            Uploading Image ...
          </div>
        </div>
      )}
    </div>
  );
}
