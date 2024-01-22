import React from 'react'

interface SectionHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> { }

export default function SectionHeader(props: SectionHeaderProps) {
    const { children, ...otherProps } = props

    return (
        <h2 className='tracking-wide font-bold text-lg' {...otherProps}>
            {children}
        </h2>
    )
}
