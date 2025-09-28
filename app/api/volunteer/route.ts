import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Volunteer } from "@/lib/volunteers";

export async function GET(req: Request) {
  await connectToDatabase();

  // get query params
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const skip = (page - 1) * limit;

  const [volunteers, total] = await Promise.all([
    Volunteer.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Volunteer.countDocuments(),
  ]);

  return NextResponse.json({
    volunteers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const volunteer = await Volunteer.create(data);

  return NextResponse.json({
    message: "Volunteer registered successfully!",
    volunteer,
  });
}
