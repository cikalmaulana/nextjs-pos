"use client"

import { Raptor } from "@/server/encryptor"
import { TransitionStartFunction } from "react"
import { ACT_Login } from "../_actions/action.login"

export function FUN_Login(props:{
    email:string,
    password:string,
    transit: TransitionStartFunction,
    whileSuccess: (data: boolean) => void,
    whileError: () => void,
}){
    props.transit(async () => {
        const parsedEmail = Raptor(props.email)
        const parsedPassword = Raptor(props.password)
        const result = await ACT_Login(parsedEmail, parsedPassword)
        
        props.whileSuccess(result)
    })
}