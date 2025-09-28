
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/lib/jwt/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    // @ts-ignore
    const token = req.cookies.get("token");
    console.log(req.cookies?.get("token"))
    if (!token) return NextResponse.json({ user: null });

    const payload = await verifyToken(token.value);
    if (!payload) return NextResponse.json({ user: null });

    return NextResponse.json({ user: payload });
}
