"use client";
import AddCardForm from "../card/AddCardForm";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthComponent({
   authType,
}: {
   authType: string;
}) {
   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div
            className={`w-full h-[100vh] flex justify-center ${authType == "login" && "items-center"}`}
         >
            <div
               className={` ${authType === "login" ? "md:max-w-[370px]" : " md:max-w-[420px]"} w-4/5  overflow-y-hidden`}
            >
               {/* logo */}
               <div className=" my-6">
                  <Logo />
               </div>

               {/* form */}
               {authType === "signup" ? (
                  <SignUpForm />
               ) : (
                  <AddCardForm />
               )}
            </div>
         </div>
         <div className="hidden lg:block">Image</div>
      </div>
   );
}
