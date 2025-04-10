"use client"

import { CE_ModalInformation } from "@/library/client.modal"
import { CE_LoginClock } from "./client.login.clock"
import { CE_LoginForm } from "./client.login.form"
import { useState } from "react"

export function CE_Login() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <div className="flex flex-row h-screen">
            <CE_LoginForm setModalOpen={(value) => setIsModalOpen(value)}/>
            <CE_LoginClock />
            <CE_ModalInformation 
                isOpen={isModalOpen} 
                btnText={"Close"} 
                title={"Failed to Login"} 
                onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
