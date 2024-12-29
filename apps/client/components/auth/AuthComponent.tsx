"use client";
import Logo from "../Logo";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthComponent({
   authType,
}: {
   authType: string;
}) {
   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-6 gap-4">
         <div className="w-full h-[93vh] flex justify-center items-center">
            <div
               className={` ${authType === "signup" ? "md:max-w-[420px]" : "md:max-w-[370px]"} w-full sm:w-4/5  overflow-y-hidden`}
            >
               {/* logo */}
               <div className=" my-6">
                  <Logo />
               </div>

               {/* form */}
               {authType === "signup" ? (
                  <SignUpForm />
               ) : (
                  <LoginForm />
               )}
            </div>
         </div>
         <div className="hidden lg:block">Image</div>
      </div>
   );
}
