import { connectToDatabase } from "@/lib/mongodb";
import { workSeed } from "@/lib/our-work/seed";
import Work from "@/lib/our-work/work";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const work = await Work.find();
  return NextResponse.json({
    success: true,
    data: work,
  });
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const work = await Work.create(workSeed);
  return NextResponse.json({
    success: true,
    data: work,
  });
}

export async function PATCH(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const work = await Work.updateOne(body);
  return NextResponse.json({
    success: true,
    data: work,
  });
}
