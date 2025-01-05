import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: null,
    step: 1,
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setStep: (state, action) => {
            state.step = action.payload;
        }
    },
})

export const { setUser, setStep } = authSlice.actions;
