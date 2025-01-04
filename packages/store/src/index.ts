import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, setStep, setUser } from "./slice/user";
import { accountSlice, setAccount } from "./slice/account";

export const rootReducer = combineReducers({
   auth: authSlice.reducer,
   account: accountSlice.reducer,
});

export { setStep, setUser, setAccount };
