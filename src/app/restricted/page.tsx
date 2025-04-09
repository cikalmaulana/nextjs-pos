"use server"

import { CE_Restricted } from "./_elements/client.restricted"

export default async function Page(){
    return (
        <CE_Restricted />
    )
}