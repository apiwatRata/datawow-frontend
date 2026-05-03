"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify, SignJWT } from 'jose';
import { Role } from './types/role-type';

export type Session = {
    user: {
        id: string,
        email: string,
        role: Role,
    };
    accessToken: string;
    refreshToken: string;
}

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession ( payload : Session){
    const expiredAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

    const cookie = await cookies(); 
    cookie.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookie = await cookies();
    const token = cookie.get("session")?.value;
    if(!token) redirect("/login");

    try{
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        })
        return payload as Session;
    }catch(err){
        console.error("Failed to verify the session",err);
        redirect("/login");
    }
}

export async function deleteSession(){
    const cookie = await cookies();
    cookie.delete("session");
}

export async function updateTokens({accessToken, refreshToken}: { accessToken: string; refreshToken: string;}){
    const cookie = await cookies();
    const session = cookie.get("session")?.value;
    if(!session) return null;

    const { payload } =  await jwtVerify<Session>(session, encodedKey)
    if(!payload) throw new Error("Session not found");

    const newPayload: Session = {
        user: {
            ...payload.user,
        },
        accessToken,
        refreshToken
    }

    await createSession(newPayload);
}