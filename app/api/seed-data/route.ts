import { Main } from "@/scripts/seed";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await Main()
    return NextResponse.json({ message: "Data seeded successfully" })
}