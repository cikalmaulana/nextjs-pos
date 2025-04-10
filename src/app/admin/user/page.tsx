"use server"

import { CE_UserManagement } from "./_elements/client.user"


export default async function Page(){
    return (
        <div>
            <CE_UserManagement />
        </div>
    )
}