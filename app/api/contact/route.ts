import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ContactPageModel } from "@/lib/contact/contact";
import { seedContact } from "@/lib/contact/seed";

export async function GET() {
  await connectToDatabase();
  const data = await ContactPageModel.findOne();
  return NextResponse.json({ contactPage: data });
}



export async function PATCH(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const updated = await ContactPageModel.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });

  return NextResponse.json({ contactPage: updated });
}
