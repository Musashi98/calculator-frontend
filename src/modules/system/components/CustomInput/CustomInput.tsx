import React from 'react'

interface CustomInputProps extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
    type?: string;
    borders?: "default" | "error"
    placeholder?: string;
}

export default function CustomInput(props: CustomInputProps) {
    const { value, type, borders, placeholder, ...otherProps } = props

    let borderStyle = "border-neutral-400 focus:border-neutral-700"

    switch (borders) {
        case "error": {
            borderStyle = "border-red-400 focus:border-red-700"
            break
        }

        default: {
            break
        }
    }

    return (
        <input
            value={value}
            type={type}
            placeholder={placeholder}
            className={`border-2 rounded-sm px-2 py-1 outline-none ${borderStyle}`}
            {...otherProps}
        />
    )
}
