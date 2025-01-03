"use client";
import React, { useState } from "react";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpIputProps } from "@repo/interface/interface";

export default function SignUpForm() {
   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
   } = useForm<SignUpIputProps>();

   const onSignUp: SubmitHandler<SignUpIputProps> = (data) => {
      console.log("hellow");
      console.log(data);
   };

   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Sign up</h1>
         <p className="text-gray-600 mb-6">
            Please enter your details.
         </p>
         <form onSubmit={handleSubmit(onSignUp)}>
            <div className="flex gap-4">
               <Input
                  id="firstName"
                  placeholder="ex: John"
                  label="First Name"
                  errors={errors}
                  register={register}
                  maxLength={30}
               />
               <Input
                  label="Last Name"
                  id="lastName"
                  placeholder="ex: Doe"
                  errors={errors}
                  register={register}
                  maxLength={30}
               />
            </div>
            <Input
               label="Address"
               id="address"
               placeholder="Enter your specific address"
               errors={errors}
               register={register}
               maxLength={200}
            />
            <div className="flex gap-4">
               <Input
                  label="State"
                  id="state"
                  placeholder="ex: Lagos"
                  errors={errors}
                  register={register}
                  maxLength={30}
               />
               <Input
                  label="Dater of Birth"
                  placeholder="yyyy-mm-dd"
                  id="dob"
                  type="date"
                  errors={errors}
                  register={register}
               />
            </div>
            <Input
               label="Email"
               placeholder="Enter your email"
               id="email"
               type="email"
               errors={errors}
               register={register}
               pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            />
            <Input
               label="Password"
               placeholder="Enter your password"
               id="password"
               type="password"
               errors={errors}
               register={register}
               pattern={
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
               }
            />

            <Button
               type="submit"
               onClick={handleSubmit(onSignUp)}
               // onclick={() => console.log("hello")}
            >
               Next
            </Button>
            <p className="text-center text-gray-600 mt-4">
               Already have an account?{" "}
               <span
                  onClick={() => router.push("/login")}
                  className="text-sky-700 font-semibold cursor-pointer transition-all duration-150 hover:text-sky-900"
               >
                  Login
               </span>
            </p>
         </form>
      </div>
   );
}
