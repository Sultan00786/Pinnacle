"use client";
import React from "react";
import AddCardForm from "../../../components/account/AddCardForm";
import { useSelector } from "react-redux";
import { RootState } from "@repo/interface/interface";
import OtpVerify from "../../../components/account/OtpVerify";

function AddBankAcc() {
   const { step } = useSelector((state: RootState) => state.auth);
   return (
      <div className="flex items-center justify-center w-full h-full">
         <div className="w-[500px] px-10">
            {step === 3 ? <OtpVerify isSignUp={false} /> : <AddCardForm />}
         </div>
      </div>
   );
}

export default AddBankAcc;
