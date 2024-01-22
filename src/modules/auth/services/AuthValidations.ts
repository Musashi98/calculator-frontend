const nameRegex = /^[a-zA-Z0-9_-]*$/
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]*$/

const AuthValidations = {
    isValidName: (name: string) => {
        if (!(name.match(nameRegex)))
            return {
                result: false,
                motive: "Apenas letras, números e sublinhados são válidos"
            }

        if (!(name.length >= 4 && name.length <= 20))
            return {
                result: false,
                motive: "Deve inserir entre 4 e 20 caracteres"
            }

        return {
            result: true
        }
    },

    isValidEmail: (email: string) => {
        if (!(email.match(emailRegex)))
            return {
                result: false,
                motive: "Não é um e-mail válido"
            }

        return {
            result: true
        }
    },

    isValidPassword: (password: string) => {
        if (!(password.match(passwordRegex)))
            return {
                result: false,
                motive: "Apenas letras, números e caracteres especiais são válidos"
            }

        if (!(password.length >= 6 && password.length <= 20))
            return {
                result: false,
                motive: "Deve inserir entre 6 e 20 caracteres"
            }

        return {
            result: true
        }
    }
}

export default AuthValidations