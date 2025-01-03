"use client";
import { configureStore, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "@repo/store/recoil";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export default function provider({
   children,
}: {
   children: React.ReactNode;
}) {
   const store = configureStore({
      reducer: rootReducer,
   });

   return (
      <Provider store={store}>
         <SessionProvider>{children}</SessionProvider>
      </Provider>
   );
}
