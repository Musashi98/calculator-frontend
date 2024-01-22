import User from "../types/User"

const LocalStorage = {
    getUser: () => {
        let unparsedContent = localStorage.getItem("user")

        let user: User | null = null

        if (unparsedContent !== null) {
            user = JSON.parse(unparsedContent) as User
        }

        return user
    },

    setUser: (user: User | null) => {
        if (user === null) {
            localStorage.removeItem('user')
        }
        else {
            localStorage.setItem("user", JSON.stringify(user))
        }

    }
}

export default LocalStorage