import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import HeaderBar from '../../system/components/HeaderBar/HeaderBar'
import CardContainer from '../../system/components/CardContainer/CardContainer'
import SectionHeader from '../../system/components/SectionHeader/SectionHeader'
import CustomInput from '../../system/components/CustomInput/CustomInput'
import CustomButton from '../../system/components/CustomButton/CustomButton'
import CalcValidations from '../services/CalcValidations'
import InputErrorText from '../../system/components/InputErrorText/InputErrorText'
import { useDispatch, useSelector } from 'react-redux'
import StoreState from '../../../types/StoreState'
import CalcAPICalls from '../services/CalcAPICalls'
import { changeUser } from '../../../store/slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import AuthAPICalls from '../../auth/services/AuthAPICalls'
import User from '../../../types/User'
import useDeviceSize from '../../../hooks/useDeviceSize'
import ErrorBand from '../../system/components/ErrorBand/ErrorBand'


export default function Calculator() {


    const user = useSelector((state: StoreState) => state.user.info) as User

    const token = useSelector((state: StoreState) => state.user.info?.token)
    const refreshToken = useSelector((state: StoreState) => state.user.info?.refreshToken)

    const tokenRef = useRef(token)
    tokenRef.current = token

    const refreshTokenRef = useRef(refreshToken)
    refreshTokenRef.current = refreshToken

    const deviceSize = useDeviceSize()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [number1, setNumber1] = useState("")
    const [number2, setNumber2] = useState("")

    const [number1Error, setNumber1Error] = useState("")
    const [number2Error, setNumber2Error] = useState("")

    const [result, setResult] = useState("")

    const [errorBandText, setErrorBandText] = useState("")

    const manipulatedNumber1 = useRef(false)
    const manipulatedNumber2 = useRef(false)

    useEffect(() => {
        if (manipulatedNumber1.current) {
            const validationsResult = CalcValidations.isValidNumber(number1)

            if (!validationsResult.result) {
                setNumber1Error(validationsResult.motive || "")
            }
            else {
                setNumber1Error("")
            }
        }
    }, [number1])

    useEffect(() => {
        if (manipulatedNumber2.current) {
            const validationsResult = CalcValidations.isValidNumber(number2)

            if (!validationsResult.result) {
                setNumber2Error(validationsResult.motive || "")
            }
            else {
                setNumber2Error("")
            }
        }
    }, [number2])

    const changeNumber1 = (event: ChangeEvent<HTMLInputElement>) => {
        setNumber1(event.target.value)

        manipulatedNumber1.current = true
    }

    const changeNumber2 = (event: ChangeEvent<HTMLInputElement>) => {
        setNumber2(event.target.value)

        manipulatedNumber2.current = true
    }

    const queryOperation = async (op: string) => {
        const operationResult = await CalcAPICalls.getOperationResult(number1, number2, op, tokenRef.current as string)

        switch (operationResult.status) {
            case 200: {
                setResult(operationResult.data.result)
                break;
            }
            case 400: {
                setErrorBandText("Os dados enviados contêm erros")
                break;
            }
            case 401: {
                dispatch(changeUser(null))
                navigate("/login")
                break;
            }
            case 403: {
                const refreshTokensResult = await AuthAPICalls.refreshTokens(refreshTokenRef.current as string)

                switch (refreshTokensResult.status) {
                    case 200: {
                        dispatch(changeUser({ ...user, token: refreshTokensResult.data.token, refreshToken: refreshTokensResult.data.refreshToken }))
                        queryOperation(op)
                        break
                    }
                    case 401: {
                        dispatch(changeUser(null))
                        navigate("/login")
                        break
                    }
                    default: {
                        setErrorBandText("Ocorreu um problema com a solicitação ao servidor")
                        break
                    }
                }

                break;
            }
            default: {
                setErrorBandText("Ocorreu um problema com a solicitação ao servidor")
                break
            }
        }
    }

    const addClickHandler = () => {
        queryOperation("add")
    }

    const substractClickHandler = () => {
        queryOperation("sub")
    }

    const multiplyClickHandler = () => {
        queryOperation("mult")
    }

    const divideClickHandler = () => {
        queryOperation("div")
    }

    const disabledButtons = (!manipulatedNumber1.current || !manipulatedNumber2.current || number1Error !== "" || number2Error !== "")

    return (
        <div className='min-h-screen w-screen relative flex flex-col'>
            <HeaderBar />

            <div
                className='flex-1 p-0 sm:pt-20 flex flex-col items-center relative'
            >
                <ErrorBand style={{ top: 80 }} text={errorBandText} textSetter={setErrorBandText} />
                <CardContainer style={{ width: deviceSize === "sm" ? "100vw" : "80vw", height: deviceSize === "sm" ? "100%" : "auto", flex: deviceSize === "sm" ? 1 : "none" }}>
                    <SectionHeader style={{ textAlign: 'center' }}>CALCULADORA</SectionHeader>
                    <div className='mt-10 gap-4 w-full flex justify-around flex-wrap items-center'>
                        <div className='flex flex-col gap-2 items-center'>
                            <div className='flex gap-1 flex-col xl:flex-row'>
                                <label htmlFor='Number1' className='mt-1'>Número 1:</label>
                                <div>
                                    <CustomInput placeholder='Escreva um número' borders={number1Error ? "error" : 'default'} id='Number1' value={number1} onChange={changeNumber1} type='number' />
                                    <InputErrorText text={number1Error} />
                                </div>
                            </div>
                            <div className='flex gap-1 flex-col xl:flex-row'>
                                <label htmlFor='Number2' className='mt-1'>Número 2:</label>
                                <div>
                                    <CustomInput placeholder='Escreva um número' borders={number2Error ? "error" : 'default'} id='Number2' value={number2} onChange={changeNumber2} type='number' />
                                    <InputErrorText text={number2Error} />
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-wrap justify-center items-center gap-4'>
                            <CustomButton onClick={addClickHandler} disabled={disabledButtons} style={{ width: 170, height: 40 }}>SOMAR</CustomButton>
                            <CustomButton onClick={substractClickHandler} disabled={disabledButtons} style={{ width: 170, height: 40 }}>SUBTRAIR</CustomButton>
                            <CustomButton onClick={multiplyClickHandler} disabled={disabledButtons} style={{ width: 170, height: 40 }}>MULTIPLICAR</CustomButton>
                            <CustomButton onClick={divideClickHandler} disabled={disabledButtons} style={{ width: 170, height: 40 }}>DIVIDIR</CustomButton>
                        </div>
                        <div className='w-72 h-44 bg-neutral-500 text-white flex flex-col items-center justify-center gap-1 p-4'>
                            {
                                result === "" && <p>Escreva dois números e selecione uma operação matemática para ver o resultado aqui</p>
                            }
                            {
                                result !== "" && <>
                                    <h3 className='text-lg tracking-wide'>RESULTADO</h3>
                                    <p>{result}</p>
                                </>
                            }

                        </div>
                    </div>
                </CardContainer>
            </div>

        </div>
    )
}
