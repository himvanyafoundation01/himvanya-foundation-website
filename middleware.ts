import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt/jwt";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/api/payment") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.startsWith("/public")
    ) {
        return NextResponse.next();
    }

    const isAdminPage = pathname.startsWith("/admin");
    const isAdminApi = pathname.startsWith("/api/admin");
    const isLoginPage = pathname === "/admin";

    if ((isAdminPage || isAdminApi) && !isLoginPage) {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        try {
            const decoded = await verifyToken(token);
            if (!decoded) {
                return NextResponse.redirect(new URL("/admin", req.url));
            }
            if (decoded.role !== "admin") {
                return NextResponse.json({ error: "Forbidden: not admin" }, { status: 403 });
            }

            const requestHeaders = new Headers(req.headers);
            requestHeaders.set("x-user-id", decoded.id);
            requestHeaders.set("x-user-role", decoded.role);

            return NextResponse.next({ request: { headers: requestHeaders } });
        } catch {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
