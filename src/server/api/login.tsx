"use server"

import { UserData } from "../dummy/dummy.user.data"

export interface IReq_Login {
    email: string
    password: string
}

export interface IRes_Login {
    id: number
    name: string
    email: string
    role: string
    isActive: boolean
    createdAt: string
}

export async function API_Login(payload: IReq_Login): Promise<IRes_Login | string> {
    // password default: 'password123'
    const { email, password } = payload

    const user = UserData.find(u => u.email === email)

    if (!user) {
        return ("User not found")
    }

    if (password !== "password123") {
        return ("Invalid password")
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
    }
}
