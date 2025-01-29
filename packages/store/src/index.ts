import { combineReducers } from "@reduxjs/toolkit";
import { authSlice, setStep, setUser } from "./slice/user";
import { accountSlice, setAccount } from "./slice/account";
import { loadingSlice } from "./slice/loading";

export const rootReducer = combineReducers({
   loading: loadingSlice.reducer,
   auth: authSlice.reducer,
   account: accountSlice.reducer,
});

export { setStep, setUser, setAccount };
