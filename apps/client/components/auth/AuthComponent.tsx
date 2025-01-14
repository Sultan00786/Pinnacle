"use client";
import { RootState } from "@repo/interface/interface";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AddCardForm from "../account/AddCardForm";
import OtpVerify from "../account/OtpVerify";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Image from "next/image";
import LoginImage from "../../public/image.png";

export default function AuthComponent({ authType }: { authType: string }) {
   const { step } = useSelector((state: RootState) => state.auth);

   const dispatch = useDispatch();
   const router = useRouter();

   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div className={`w-full h-[100vh] flex justify-center items-center`}>
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
         <div className=" relative hidden lg:block bg-purple-100/20 overflow-x-hidden">
            <div className="w-[1300px] absolute top-12 left-12 rounded-2xl border-5 border-black z-20">
               <Image
                  src={LoginImage}
                  alt="Login Image"
                  className=" rounded-2xl z-10 w-[1000px]"
               />
            </div>
         </div>
      </div>
   );
}
