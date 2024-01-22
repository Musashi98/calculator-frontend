import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StoreState from '../../../../types/StoreState'
import { useNavigate } from 'react-router-dom'
import { changeUser } from '../../../../store/slices/UserSlice'
import useDeviceSize from '../../../../hooks/useDeviceSize'

export default function HeaderBar() {

    const dispatch = useDispatch()

    const deviceSize = useDeviceSize()

    const user = useSelector((state: StoreState) => state.user.info)

    const navigate = useNavigate()

    useEffect(() => {
        if (user === null) {
            navigate("/login")
        }
    })

    const logout = () => {
        dispatch(changeUser(null))
        navigate("/login")
    }

    return (
        <div className='sticky top-0 left-0 w-screen bg-orange-300 flex justify-between items-center gap-4 h-16 px-8 sm:px-20 shadow-md z-40'>
            <h1 className='text-2xl font-bold tracking-widest'>THREEOCALC</h1>
            <div className='flex items-center'>
                {
                    deviceSize !== "sm" && <p className='mr-4'>Olá <span className='font-semibold'>{user ? user.username : ""}</span> !</p>
                }
                <button className='bg-neutral-700 text-white rounded-sm shadow-md px-4 py-1 hover:bg-neutral-600 transition-all duration-300' onClick={logout}>SAIR</button>
            </div>
        </div>
    )
}
