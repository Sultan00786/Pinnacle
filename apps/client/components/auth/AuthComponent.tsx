"use client";
import { RootState } from "@repo/interface/interface";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AddCardForm from "../card/AddCardForm";
import OtpVerify from "../card/OtpVerify";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthComponent({
   authType,
}: {
   authType: string;
}) {
   const { step } = useSelector(
      (state: RootState) => state.auth
   );

   const dispatch = useDispatch();
   const router = useRouter();

   
   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div
            className={`w-full h-[100vh] flex justify-center items-center`}
         >
            <div
               className={` ${authType === "login" ? "md:max-w-[370px]" : " md:max-w-[420px]"} w-4/5`}
            >
               {/* logo */}
               <div className=" my-6">
                  <Logo />
               </div>

               {/* form */}
               {authType === "signup" ? (
                  (step === 1 && <SignUpForm />) ||
                  (step === 2 && <AddCardForm />) ||
                  (step === 3 && <OtpVerify />)
               ) : (
                  <LoginForm />
               )}
            </div>
         </div>
         <div className="hidden lg:block">Image</div>
      </div>
   );
}
