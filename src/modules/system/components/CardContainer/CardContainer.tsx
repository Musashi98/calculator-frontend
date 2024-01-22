import React from 'react'

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function CardContainer(props: CardContainerProps) {
    const { children, ...otherProps } = props

    return (
        <div
            className={`px-8 sm:px-14 py-6 rounded-sm shadow-md bg-white flex flex-col`}
            {...otherProps}
        >
            {children}
        </div>
    )
}
