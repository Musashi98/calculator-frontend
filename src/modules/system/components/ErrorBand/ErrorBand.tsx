import React from 'react'

interface ErrorBandProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    textSetter: (val: string) => void;
}

export default function ErrorBand(props: ErrorBandProps) {
    const { text, textSetter, style } = props

    const closeErrorBand = () => [
        textSetter("")
    ]

    if (!text)
        return null

    return (
        <div className='fixed top-6 flex justify-center rounded-sm bg-red-600 text-white shadow-md z-50' style={style}>
            <div className='flex items-center relative py-6 px-14'>
                <p>{text}</p>
                <button className='absolute right-2 top-1 p-1' onClick={closeErrorBand}>X</button>
            </div>
        </div>
    )
}
