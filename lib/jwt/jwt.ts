import { SignJWT, jwtVerify } from "jose";

export interface CustomPayload extends Record<string, unknown> {
    id: string;
    role: string;
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

export async function signToken(payload: CustomPayload, expiresIn = "31d") {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(expiresIn)
        .setIssuedAt()
        .sign(SECRET_KEY);
}

export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as CustomPayload;
    } catch (err) {
        return null;
    }
}
