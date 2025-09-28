import { NextRequest, NextResponse } from "next/server";
import { HomePageContentModel } from "@/lib/home/home";
import { connectToDatabase } from "@/lib/mongodb";
import { logger, runMiddleware } from "@/lib/morgan";
import { seedData } from "@/lib/home/seed";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await runMiddleware(req, res, logger);

    await connectToDatabase();
    const updated = await HomePageContentModel.findOne().lean();

    return NextResponse.json(
      {
        message: "Homepage content fetched successfully",
        updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch homepage content",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}



export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await runMiddleware(req, res, logger);

    await connectToDatabase();
    const body = await req.json();
    const updated = await HomePageContentModel.findOneAndUpdate(
      {},
      body,
      { new: true }
    ).lean();

    return NextResponse.json(
      {
        message: "Homepage content fetched successfully",
        updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch homepage content",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}