import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("⚠️ JWT_SECRET missing in .env.local");

export async function hashKey(secret: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(secret, salt);
}

export async function compareKey(secret: string, hash: string) {
    // return bcrypt.compare(secret, hash);
    if (secret == hash) {
        return true;
    }
    else { return false }
}

export function signJwt(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJwt(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}
