import { createSlice } from "@reduxjs/toolkit";



export const accountSlice = createSlice({
    name: "account",
    initialState: null,
    reducers: {
        setAccount: (state, action) => {
            state = action.payload
        }
    },
})

export const { setAccount } = accountSlice.actions;
