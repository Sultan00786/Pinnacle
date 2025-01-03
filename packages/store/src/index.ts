import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, setStep, setUser } from "./slice/user";

export const rootReducer = combineReducers({
   auth: authSlice.reducer,
});

export { setStep, setUser };
