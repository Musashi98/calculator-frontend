const numberRegex = /^[+-]?([0-9]*[.])?[0-9]+$/

const CalcValidations = {
    isValidNumber: (number: string) => {
        if (!numberRegex.test(number)) {
            return {
                result: false,
                motive: "Não é um número válido"
            }
        }

        return {
            result: true
        }
    }
}

export default CalcValidations