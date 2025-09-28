
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", "vanya_admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure=true");
    res.status(200).json({ message: "Logged out" });
}
