import customFetch from "../../../utils/CustomFetch"

const urlPrefix = process.env.REACT_APP_SERVER_URL + "calc"

const CalcAPICalls = {
    getOperationResult: async (num1: string, num2: string, op: string, token: string) => {
        const result = await customFetch({
            url: `${urlPrefix}?num1=${num1}&num2=${num2}&op=${op}`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return result
    }
}

export default CalcAPICalls