
import { NextResponse } from "next/server";
import { ContactSubmission } from "@/lib/contact-submission/submissionmodel";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    await connectToDatabase();
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    return NextResponse.json({ submissions });
}

export async function POST(req: Request) {
    await connectToDatabase();
    const data = await req.json();
    await ContactSubmission.create(data);
    return NextResponse.json({ message: "Your message has been sent successfully!" });
}
