"use server"

import { cookies } from "next/headers"
import { API_Login, IRes_Login } from "@/server/api/login"
import { Reptile } from "@/server/decryptor"

export async function ACT_Login(email: string, password: string): Promise<boolean> {
    const parsedEmail = Reptile(email)
    const parsedPassword = Reptile(password)

    const payload = {
        email: parsedEmail,
        password: parsedPassword,
    }

    const result: string | IRes_Login = await API_Login(payload)

    if (typeof result === "string") {
        return false
    }

    const { id, name, email: resEmail, role, isActive } = result

    const userData = {
        id,
        name,
        email: resEmail,
        role,
        isActive,
    }

    const KEY = process.env.SESSION_COOKIE_NAME || "user_session"

    const cookieStore = await cookies()
    cookieStore.set(KEY, JSON.stringify(userData), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 6,
    })

    return true
}
