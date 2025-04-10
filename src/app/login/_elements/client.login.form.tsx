"use client"

import { CE_Button } from "@/library/client.button"
import { CE_Input } from "@/library/client.input"
import { useState, useTransition } from "react"
import { CE_Forgot } from "./client.forgot"
import { FUN_Login } from "../_functions/function.login"
import { Reload } from "@/server/reload"
import Image from "next/image"
import { validateEmail } from "@/library/client.validation"

interface I_Props {
    setModalOpen: (open: boolean) => void
}

export function CE_LoginForm(props: I_Props) {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [pendingLogin, isTransitionLogin] = useTransition()
    const [isForgotOpen, setIsForgotOpen] = useState<boolean>(false)
    const [emailWarningShow, setEmailWarningShow] = useState<boolean>(false)

    const signIn = () => {
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            setEmailWarningShow(true)
            return
        }
        FUN_Login({
            email: email,
            password: password,
            transit: isTransitionLogin,
            whileSuccess: (success: boolean) => {
                if (!success) props.setModalOpen(true)
                else Reload()
            },
            whileError: () => {
                alert("Error occurred")
            }
        })
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            {
                !isForgotOpen ?
                    <div className="flex flex-col items-center justify-center bg-white w-2/3 shadow-lg rounded-3xl px-5 py-10">
                        <div className="text-2xl font-bold">Sign In</div>
                        <div className="text-paw-grey text-sm mb-3">Welcome back!</div>
                        <CE_Input
                            text="Email" withHeader={true} onChange={setEmail} headerClassName="w-4/5"
                            value={email} placeholder="Enter your email" type="text"
                        />
                        {emailWarningShow && (
                            <div className="text-red-800 text-sm flex w-4/5 mt-1">Please enter a valid email.</div>
                        )}
                        <div className="w-4/5 mt-3 relative">
                            <CE_Input
                                text="Password" withHeader={true} onChange={setPassword}
                                value={password} placeholder="Enter your password" type={showPassword ? "text" : "password"}
                            />
                            <div
                                className="absolute right-4 top-[36px] cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <Image 
                                    src={showPassword ? "/assets/icons/hide.png" : "/assets/icons/view.png"}
                                    alt="Toggle password"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-4/5 mb-3 mt-2">
                            <div className="flex-1 flex flex-row items-center">
                                <label className="flex flex-row items-center cursor-pointer">
                                    <input type="checkbox" className="cursor-pointer" />
                                    <span className="text-paw-grey text-sm ms-2">Remember me</span>
                                </label>
                            </div>
                            <div
                                className="text-paw-blue text-sm font-semibold hover:text-paw-blue-dark hover:cursor-pointer"
                                onClick={() => setIsForgotOpen(true)}
                            >
                                Forgot Password
                            </div>
                        </div>
                        <CE_Button text="Sign In" onClick={() => signIn()} disabled={pendingLogin} pending={pendingLogin} width="w-4/5" />
                    </div> :
                    <CE_Forgot backToSignIn={() => setIsForgotOpen(false)} />
            }
        </div>
    )
}
