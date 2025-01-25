"use client";
import { RootState } from "@repo/interface/interface";
import { useSelector } from "react-redux";
import AddCardForm from "../../../components/account/AddCardForm";
import OtpVerify from "../../../components/account/OtpVerify";

function AddBankAcc() {
   const { step } = useSelector((state: RootState) => state.auth);
   return (
      <div className="flex items-center justify-center w-full h-full">
         <div className="w-[500px] px-10">
            {step === 3 ? (
               <OtpVerify isSignUp={false} />
            ) : (
               <AddCardForm isBackButton={false} />
            )}
         </div>
      </div>
   );
}

export default AddBankAcc;
