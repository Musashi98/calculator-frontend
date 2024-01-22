import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";
import LocalStorage from "../../utils/LocalStorage";


const UserSlice = createSlice({
    name: "user",
    initialState: {
        info: LocalStorage.getUser()
    },
    reducers: {
        changeUser: (state: { info: User | null }, action) => {
            LocalStorage.setUser(action.payload)
            state.info = action.payload
        }
    }
})

export const { changeUser } = UserSlice.actions

export default UserSlice.reducer