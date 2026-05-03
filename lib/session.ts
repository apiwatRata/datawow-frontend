"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import axios from "../services/axiosInstance"; 

export type Session = {
    user: {
        id: string,
        email: string,
        role: string,
    };
    accessToken: string;
    refreshToken: string;
}

export async function createSession ( token: string){
    const expiredAt = new Date( Date.now() + 7 * 24 * 60 * 60 * 1000);

    const cookie = await cookies();
    cookie.set("session", token, {
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

        return payload as Session;
    }catch(err){
        console.error("Failed to verify the session",err);
        redirect("/login");
    }
}