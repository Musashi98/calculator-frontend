import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthValidations from '../services/AuthValidations'
import AuthAPICalls from '../services/AuthAPICalls'
import { changeUser } from '../../../store/slices/UserSlice'
import ErrorBand from '../../system/components/ErrorBand/ErrorBand'
import CardContainer from '../../system/components/CardContainer/CardContainer'
import SectionHeader from '../../system/components/SectionHeader/SectionHeader'
import CustomInput from '../../system/components/CustomInput/CustomInput'
import InputErrorText from '../../system/components/InputErrorText/InputErrorText'
import CustomButton from '../../system/components/CustomButton/CustomButton'
import LinkText from '../../system/components/LinkText/LinkText'
import useDeviceSize from '../../../hooks/useDeviceSize'

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deviceSize = useDeviceSize()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [errorBandText, setErrorBandText] = useState("")

    const manipulatedEmail = useRef(false)
    const manipulatedPassword = useRef(false)

    useEffect(() => {
        if (manipulatedEmail.current) {
            const validationResult = AuthValidations.isValidEmail(email)

            if (!validationResult.result) {
                setEmailError(validationResult.motive || "")
            }
            else {
                setEmailError("")
            }
        }
    }, [email])

    useEffect(() => {
        if (manipulatedPassword.current) {
            const validationResult = AuthValidations.isValidPassword(password)

            if (!validationResult.result) {
                setPasswordError(validationResult.motive || "")
            }
            else {
                setPasswordError("")
            }
        }
    }, [password])

    const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)

        manipulatedEmail.current = true
    }

    const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)

        manipulatedPassword.current = true
    }

    const goToRegisterPage = () => {
        navigate("/register")
    }

    const login = async () => {
        const registerResult = await AuthAPICalls.login(email, password)

        switch (registerResult.status) {
            case 200: {
                dispatch(changeUser(registerResult.data))
                navigate("/calc")
                break
            }
            case 400: {
                if (registerResult.data.errorCode === 1) {
                    setErrorBandText("Os dados enviados contêm erros")
                }
                else {
                    setErrorBandText("O e-mail e a senha fornecidos estão incorretos")
                }
                break
            }
            default: {
                setErrorBandText("Ocorreu um problema com a solicitação ao servidor")
                break
            }
        }
    }

    return (
        <div className='min-h-screen w-screen flex flex-col items-center justify-center relative'>
            <ErrorBand text={errorBandText} textSetter={setErrorBandText} />
            <CardContainer
                style={{
                    width: (deviceSize === "md" || deviceSize === "sm") ? "100vw" : "40rem",
                    height: (deviceSize === "md" || deviceSize === "sm") ? "100vh" : "auto",
                    justifyContent: "center"
                }}
            >
                <SectionHeader
                    style={{
                        textAlign: 'center'
                    }}
                >
                    INICIAR SESSÃO
                </SectionHeader>

                <div className='w-full flex flex-col items-center mt-10'>
                    <div className='flex flex-col items-end gap-6'>
                        <div className='flex gap-1'>
                            <label className='mt-1' htmlFor='EmailInput'>E-mail:</label>
                            <div className='flex flex-col'>
                                <CustomInput placeholder='Escreva o seu e-mail' borders={`${emailError !== "" ? "error" : "default"}`} value={email} onChange={changeEmailHandler} id='EmailInput' />
                                <InputErrorText text={emailError} />
                            </div>
                        </div>
                        <div className='flex gap-1'>
                            <label className='mt-1' htmlFor='PasswordInput'>Senha:</label>
                            <div className='flex flex-col'>
                                <CustomInput placeholder='Escreva a sua senha' borders={`${passwordError !== "" ? "error" : "default"}`} value={password} onChange={changePasswordHandler} type="password" id='PasswordInput' />
                                <InputErrorText text={passwordError} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center mt-14'>
                    <CustomButton
                        disabled={!manipulatedEmail.current || !manipulatedPassword.current || emailError !== "" || passwordError !== ""}
                        onClick={login}
                    >
                        ACESSAR
                    </CustomButton>
                </div>

                <div className='flex items-center justify-center mt-4'>
                    <p>Já tem uma conta? <LinkText onClick={goToRegisterPage}>Cadastrar-se</LinkText></p>
                </div>
            </CardContainer>
        </div>
    )
}
