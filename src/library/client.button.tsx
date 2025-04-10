"use client"

import { CE_LoadingAnimation } from "./client.loading.animation"

interface I_Props{
    text: string
    onClick: () => void
    width: string
    className?: string
    disabled?: boolean
    pending?: boolean
}

export function CE_Button(props: I_Props){
    return (
        <div 
            className={`
                flex items-center justify-center px-3 py-2 h-[40px] text-white
                rounded-3xl transition-colors duration-300
                ${props.disabled 
                    ? 'bg-paw-grey hover:bg-paw-grey hover:cursor-not-allowed' 
                    : 'bg-paw-blue hover:bg-paw-blue-dark hover:cursor-pointer'
                }
                ${props.className}
                ${props.width}
            `}
            onClick={props.onClick}
        >
            {props.pending ? 
                <CE_LoadingAnimation size={16} color="white"/>: props.text
            }
        </div>
    )
}