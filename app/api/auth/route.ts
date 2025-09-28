import { NextResponse } from "next/server";
import { signToken, verifyToken } from "@/lib/jwt/jwt";
import { Admin } from "@/lib/user/user";
import { connectToDatabase } from "@/lib/mongodb";

// --- POST: login admin and set cookie ---
export async function POST(req: Request) {
    await connectToDatabase()
    const { secret } = await req.json();

    if (secret !== process.env.LOGIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let admin = await Admin.findOne({ secretKey: secret });
    if (!admin) {
        admin = await Admin.create({ secretKey: secret });
    }

    const token = await signToken({ role: "admin", id: admin._id.toString() }, "31d");

    // Create response
    const response = NextResponse.json({ success: true, token });

    // Set cookie (httpOnly, secure in prod)
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 31
    });

    return response;
}

export async function GET(req: Request) {
    await connectToDatabase()
    const cookieHeader = req.headers.get("cookie") ?? "";
    const token = cookieHeader
        .split(";")
        .find((c) => c.trim().startsWith("token="))
        ?.split("=")[1];

    if (!token) {
        return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    try {
        const decoded = await verifyToken(token);
        return NextResponse.json({ decoded });
    } catch (err) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
