"use client"

import { useRouter } from "next/navigation"

interface I_Props{
    role: string
}

export function CE_Restricted(props: I_Props) {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Restricted Access</h1>
            <p className="text-gray-700 mb-4">You do not have permission to access this page.</p>
            <button
                onClick={() => router.push(`/${props.role}`)}
                className="px-4 py-2 bg-paw-blue text-white rounded hover:bg-blue-600"
            >
                Go Back
            </button>
        </div>
    )
}