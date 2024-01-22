import User from "./User"

type StoreState = {
    user: {
        info: User | null
    }
}

export default StoreState