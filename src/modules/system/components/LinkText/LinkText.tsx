import React from 'react'

interface LinkTextProps extends React.HTMLAttributes<HTMLParagraphElement> { }

export default function LinkText(props: LinkTextProps) {
    const { children, ...otherProps } = props

    return (
        <span className='text-orange-400 underline hover:cursor-pointer' {...otherProps}>{children}</span>
    )
}
