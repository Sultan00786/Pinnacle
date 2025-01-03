"use client";
import React, { useState } from "react";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import {
   FieldValues,
   SubmitHandler,
   useForm,
} from "react-hook-form";
import { LoginInputProps } from "@repo/interface/interface";

export default function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
   } = useForm<LoginInputProps>();

   const router = useRouter();

   const loginFunction: SubmitHandler<LoginInputProps> = (
      data
   ) => {
      console.log("hellow");
      console.log(data);
   };
   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Log in</h1>
         <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
         </p>
         <form onSubmit={handleSubmit(loginFunction)}>
            <Input
               label="Email"
               placeholder="Enter your email"
               id="email"
               type="email"
               errors={errors}
               register={register}
               // eamil pattern for validation
               pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            />
            <Input
               label="Password"
               placeholder="Enter your password"
               id="password"
               type="password"
               errors={errors}
               register={register}
               // password pattern for validatio special char, number, upper and lower case
               pattern={
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
               }
            />

            <Button
               type="submit"
               onClick={handleSubmit(loginFunction)}
            >
               Login
            </Button>
            <p className="text-center text-gray-600 mt-4">
               Don't have an account?{" "}
               <span
                  onClick={() => router.push("/signup")}
                  className="text-sky-700 font-semibold cursor-pointer transition-all duration-150 hover:text-sky-900"
               >
                  Sign up
               </span>
            </p>
         </form>
      </div>
   );
}
