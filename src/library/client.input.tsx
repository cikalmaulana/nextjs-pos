"use client"

interface I_Props {
    text?: string
    withHeader: boolean
    onChange: (value: string) => void
    headerClassName?: string
    value: string
    placeholder: string
    type: string
    inputClassName?: string
}

export function CE_Input(props: I_Props) {
    return (
        <div className={props.withHeader ? `flex flex-col gap-2 ${props.headerClassName}` : ""}>
            {props.withHeader && (
                <div className="text-paw-grey text-sm">{props.text}</div>
            )}
            <input 
                type={props.type}
                className={`rounded-xl border border-gray-400 px-3 py-2 text-sm ${props.inputClassName}`} 
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value}
            />
        </div>
    )
}
