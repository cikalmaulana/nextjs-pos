"use client"

interface I_Props {
    color?: "blue" | "white"
    size?: number
}

export function CE_LoadingAnimation({ color = "blue", size = 32 }: I_Props) {
    const colorClass = color === "blue" ? "border-paw-blue" : "border-white"

    return (
        <div
            className={`
                animate-spin rounded-full border-4 border-t-transparent
                ${colorClass}
            `}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        />
    )
}
