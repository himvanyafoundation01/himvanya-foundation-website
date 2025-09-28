import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/lib/donations/donation";

export const dynamic = "force-dynamic"; // ensures the route is always dynamic

export async function GET(request: NextRequest) {
    await connectToDatabase();

    try {
        const url = request.nextUrl; 
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "5", 10);
        const skip = (page - 1) * limit;

        const total = await Donation.countDocuments();
        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        const formatted = donations.map((d) => ({
            id: d._id.toString(),
            donor: d.name,
            email: d.email,
            amount: d.amount,
            type: d.type,
            purpose: d.purpose,
            status: d.status || "Pending",
            date: d.createdAt,
        }));

        return NextResponse.json({
            donations: formatted,
            pagination: { total, page, limit, totalPages },
        });
    } catch (error) {
        console.error("Failed to fetch donations:", error);
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}



