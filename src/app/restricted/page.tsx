"use server"

import { getFakeSession } from "@/middleware"
import { CE_Restricted } from "./_elements/client.restricted"

export default async function Page(){
    const session = getFakeSession()
    
    return (
        <CE_Restricted role={session.role === "PAW01" ? "admin" : "cashier"}/>
    )
}