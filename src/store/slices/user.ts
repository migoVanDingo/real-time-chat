import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId: "",
    username: "",
    active: false,
    lastActive: null,
    isTyping: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setActive: (state, action) => {
            state.active = action.payload
        },
        setTyping: (state, action) => {
            state.isTyping = action.payload
        },
        setLastActive: (state, action) => {
            state.lastActive = action.payload
        }
    }
})

export const { setUserId, setUsername, setActive, setTyping, setLastActive } = userSlice.actions