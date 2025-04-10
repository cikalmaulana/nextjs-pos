"use server"

import { CE_Invoice } from "./_elements/client.invoice"


export default async function Page(){
    return (
        <div>
            <CE_Invoice />
        </div>
    )
}