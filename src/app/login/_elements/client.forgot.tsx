"use client"

import { CE_Button } from "@/library/client.button"
import { CE_Input } from "@/library/client.input"
import { validateEmail } from "@/library/client.validation"
import { useState, useEffect } from "react"

interface I_Props{
    backToSignIn: () => void
}

export function CE_Forgot(props: I_Props) {
    const [email, setEmail] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    const [otpOpen, setOtpOpen] = useState<boolean>(false)
    const [pending, setPending] = useState<boolean>(false)
    const [emailWarningShow, setEmailWarningShow] = useState<boolean>(false)

    const [resendTimer, setResendTimer] = useState<number>(0)

    const closeForgotPage = () => {
        setOtpOpen(false)
        setEmail("")
        setOtp("")
        setResendTimer(0)
        setPending(false)
        props.backToSignIn()
    }

    const sendOTP = () => {
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            setEmailWarningShow(true)
            return
        }
        setEmailWarningShow(false)
        setOtpOpen(true)
        setOtp("")
        startResendTimer()
    }

    const verifyOTP = () => {
        setPending(true)
    }

    const resendOTP = () => {
        startResendTimer()
    }

    const changeEmail = () => {
        setOtpOpen(false)
        setOtp("")
        setResendTimer(0) // reset timer kalau ganti email
        setPending(false)
    }

    const startResendTimer = () => {
        setResendTimer(60)
    }

    // countdown timer
    useEffect(() => {
        if (resendTimer <= 0) return

        const interval = setInterval(() => {
            setResendTimer(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [resendTimer])

    return (
        <div className="flex flex-col items-center justify-center bg-white w-2/3 shadow-lg rounded-3xl px-5 py-10">
            <div className="text-2xl font-bold">Forgot Password</div>
            <div className="text-paw-grey text-sm mb-3">Reset your account access in a few steps</div>

            {!otpOpen ? (
                <>
                    <CE_Input 
                        text="Email"
                        withHeader={true}
                        onChange={setEmail}
                        headerClassName="w-4/5"
                        inputClassName=""
                        value={email}
                        placeholder="Enter your email"
                        type="text"
                    />
                    {emailWarningShow && (
                        <div className="text-red-800 text-sm flex w-4/5 mt-1">Please enter a valid email.</div>
                    )}
                    <CE_Button 
                        text="Send OTP"
                        onClick={sendOTP}
                        disabled={pending}
                        pending={pending}
                        width="w-4/5 mt-5"
                    />

                    <div 
                        className="text-paw-grey text-sm mt-3 hover:cursor-pointer hover:text-paw-blue"
                        onClick={() => closeForgotPage()}
                    >
                        Back to Sign In
                    </div>
                </>
            ) : (
                <>
                    <div className="text-sm mb-2 text-center text-paw-grey">
                        OTP code has been sent to your email
                    </div>

                    <CE_Input 
                        text="OTP"
                        withHeader={true}
                        onChange={(val) => {
                            if (/^\d{0,6}$/.test(val)) setOtp(val)
                        }}
                        headerClassName="w-4/5"
                        inputClassName="mb-5 tracking-widest text-center"
                        value={otp}
                        placeholder="Enter 6-digit code"
                        type="text"
                    />

                    <CE_Button 
                        text="Verify OTP"
                        onClick={() => {verifyOTP()}}
                        disabled={pending || otp.length !== 6}
                        pending={pending}
                        width="w-4/5"
                    />

                    {
                        !pending &&
                        <>
                            <div className="mt-3 text-sm text-center">
                                {resendTimer > 0 ? (
                                    <span className="text-gray-400">Resend OTP in {resendTimer}s</span>
                                ) : (
                                    <button 
                                        className="text-paw-blue hover:underline"
                                        onClick={resendOTP}
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>
                            <button
                                className="mt-2 text-sm text-paw-blue hover:underline"
                                onClick={changeEmail}
                            >
                                Change Email
                            </button>
                        </>
                    }
                </>
            )}
        </div>
    )
}
