"use client";

import { Button, Input } from "@repo/ui/component";
import Logo from "../../components/Logo";
import { useEffect } from "react";

export default function Signup() {
   return (
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 p-6 gap-4">
         <div className="w-full flex justify-center items-center">
            <div className="w-full sm:w-4/5 md:max-w-[450px] overflow-y-hidden">
               {/* logo */}
               <div className=" my-6">
                  <Logo />
               </div>

               {/* form */}
               <div>
                  <h1 className="text-4xl font-bold mb-4">
                     Sign up
                  </h1>
                  <p className="text-gray-600 mb-6">
                     Please enter your details.
                  </p>
                  <div>
                     <div className=" w-full md:flex gap-4">
                        <Input
                           id="firstName"
                           placeholder="ex: John"
                           label="First Name"
                        />
                        <Input
                           label="Last Name"
                           id="lastName"
                           placeholder="ex: Doe"
                        />
                     </div>
                     <Input
                        label="Address"
                        id="address"
                        placeholder="Enter your specific address"
                     />
                     <div className="flex gap-4">
                        <Input
                           label="State"
                           id="state"
                           placeholder="ex: Lagos"
                        />
                        <Input
                           label="Dater of Birth"
                           placeholder="yyyy-mm-dd"
                           id="dob"
                           type="date"
                        />
                     </div>
                     <Input
                        label="Email"
                        placeholder="Enter your email"
                        id="email"
                        type="email"
                     />
                     <Input
                        label="Password"
                        placeholder="Enter your password"
                        id="password"
                        type="password"
                     />

                     <Button onclick={() => {}}>Sign up</Button>
                     <p className="text-center text-gray-600 mt-8">
                        Don't have an account?{" "}
                        <span className="text-sky-700 font-semibold cursor-pointer transition-all duration-150 hover:text-sky-900">
                           Login
                        </span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="hidden lg:block">Image</div>
      </div>
   );
}
