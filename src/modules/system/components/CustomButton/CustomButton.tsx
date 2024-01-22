import React from 'react'

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean
}

export default function CustomButton(props: CustomButtonProps) {
    const { children, disabled, ...otherProps } = props

    return (
        <button
            disabled={disabled}
            className='bg-orange-300 px-10 py-1 rounded-sm tracking-wide font-semibold hover:opacity-80 disabled:opacity-40 transition-all duration-200 shadow-md'
            {...otherProps}
        >
            {children}
        </button>
    )
}
