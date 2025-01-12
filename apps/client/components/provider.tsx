"use client";
import { NextUIProvider } from "@nextui-org/react";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "@repo/store/recoil";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function provider({ children }: { children: React.ReactNode }) {
   const store = configureStore({
      reducer: rootReducer,
   });

   return (
      <Provider store={store}>
         <SessionProvider>
            <body className=" m-0 p-0 overflow-auto">
               <NextUIProvider>{children}</NextUIProvider>
               <ToastContainer />
            </body>
         </SessionProvider>
      </Provider>
   );
}
