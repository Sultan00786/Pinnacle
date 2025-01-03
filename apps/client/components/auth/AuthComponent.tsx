"use client";
import { useDispatch, useSelector } from "react-redux";
import AddCardForm from "../card/AddCardForm";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useRecoilState } from "recoil";
import { RootState } from "@repo/interface/interface";
import { setStep } from "@repo/store/recoil";

export default function AuthComponent({
   authType,
}: {
   authType: string;
}) {
   const { step } = useSelector(
      (state: RootState) => state.auth
   );

   const dispatch = useDispatch()
   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div
            className={`w-full h-[100vh] flex justify-center ${authType == "login" && "items-center"}`}
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
                  (step === 2 && <AddCardForm />)
               ) : (
                  <LoginForm />
               )}
            </div>
         </div>
         <div className="hidden lg:block">Image</div>
      </div>
   );
}
