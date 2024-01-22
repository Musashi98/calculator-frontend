import React from 'react'

export default function BackgroundLayer() {
    return (
        <div
            className='fixed top-0 left-0 h-screen w-screen'
            style={{
                backgroundImage: `url(${require("../../../../assets/images/bg.jpg")})`,
                backgroundSize: "cover"
            }}
        >
            <div
                className='h-full w-full'
                style={{
                    backgroundColor: "rgba(50, 50, 50, 0.7)"
                }}
            />
        </div>
    )
}
