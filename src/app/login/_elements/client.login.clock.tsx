"use client"

import { useEffect, useState } from "react"

export function CE_LoginClock() {
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            // Convert ke WIB (UTC+7)
            const utc = now.getTime() + now.getTimezoneOffset() * 60000
            const wibTime = new Date(utc + 7 * 60 * 60 * 1000)

            const hours = wibTime.getHours().toString().padStart(2, '0')
            const minutes = wibTime.getMinutes().toString().padStart(2, '0')
            const seconds = wibTime.getSeconds().toString().padStart(2, '0')
            setTime(`${hours}:${minutes}:${seconds}`)

            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            setDate(wibTime.toLocaleDateString('en-US', options))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex-1 flex flex-col items-center justify-center rounded-3xl bg-paw-blue text-white mt-5 mb-5 me-5 p-5">
            <div className="font-semibold text-[50px] text-center">Welcome Back!</div>
            <div className="font-semibold text-3xl text-center">Please Sign In to your Paw Account</div>

            <div className="mt-4 text-lg font-mono">
                {time} WIB
            </div>
            <div className="text-sm mb-3 italic">{date}</div>


            <div className="text-sm italic text-center px-4 text-white/80">
                “A little progress each day adds up to big results.”
            </div>
        </div>
    )
}
