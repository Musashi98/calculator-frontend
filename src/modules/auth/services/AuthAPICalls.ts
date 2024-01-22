import customFetch from "../../../utils/CustomFetch"

const urlPrefix = process.env.REACT_APP_SERVER_URL + "auth"

const AuthAPICalls = {
    login: async (email: string, password: string) => {
        const result = customFetch({
            url: `${urlPrefix}/login`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                email,
                password
            }
        })

        return result
    },

    register: async (username: string, email: string, password: string) => {
        const result = customFetch({
            url: `${urlPrefix}/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                username,
                email,
                password
            }
        })

        return result
    },

    refreshTokens: async (refreshToken: string) => {
        const result = await customFetch({
            url: `${urlPrefix}/refresh`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        })

        return result
    }
}

export default AuthAPICalls