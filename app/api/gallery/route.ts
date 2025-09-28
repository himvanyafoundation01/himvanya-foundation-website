import { galleryModel } from "@/lib/gallery/gallery";
import { gallerySeed } from "@/lib/gallery/seed";
import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const gallery = await galleryModel.find();
  return NextResponse.json({
    success: true,
    data: gallery,
  });
}


export async function PATCH(req: NextRequest) {
  await connectToDatabase();
  const body = await req.json();
  const gallery = await galleryModel.updateOne(body);
  return NextResponse.json({
    success: true,
    data: gallery,
  });
}
