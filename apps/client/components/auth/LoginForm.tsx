import React from "react";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";

export default function LoginForm() {
   const router = useRouter();
   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Log in</h1>
         <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
         </p>
         <div>
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

            <Button onclick={() => {}}>Login</Button>
            <p className="text-center text-gray-600 mt-4">
               Don't have an account?{" "}
               <span
                  onClick={() => router.push("/signup")}
                  className="text-sky-700 font-semibold cursor-pointer transition-all duration-150 hover:text-sky-900"
               >
                  Sign up
               </span>
            </p>
         </div>
      </div>
   );
}
