"use client"

import { CE_Button } from "./client.button"

interface I_Props {
    isOpen: boolean
    btnText: string
    title: string
    content?: string | React.ReactNode
    onClose: () => void
}

export function CE_ModalInformation(props: I_Props) {
    if (!props.isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
                <h2 className="text-lg font-semibold mb-3">{props.title}</h2>
                <div className="mb-6 text-sm text-gray-700">{props.content}</div>
                <div className="flex justify-end">
                    <CE_Button
                        text={props.btnText}
                        onClick={props.onClose}
                        width="w-[100px]"
                    />
                </div>
            </div>
        </div>
    )
}
