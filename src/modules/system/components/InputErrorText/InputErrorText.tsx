import React from 'react'

interface InputErrorTextProps {
    text: string;
}

export default function InputErrorText(props: InputErrorTextProps) {
    const { text } = props

    if (text === "")
        return null

    return (
        <p className='text-xs text-red-400 max-w-44'>{text}</p>
    )
}
