"use client";
import React, { useState } from "react";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
   const router = useRouter();
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      dob: "",
      email: "",
      password: "",
   });
   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Sign up</h1>
         <p className="text-gray-600 mb-6">
            Please enter your details.
         </p>
         <div>
            <div className=" w-full md:flex gap-4">
               <Input
                  id="firstName"
                  placeholder="ex: John"
                  label="First Name"
                  getFormValue={(value) =>
                     setFormData({
                        ...formData,
                        firstName: value,
                     })
                  }
               />
               <Input
                  label="Last Name"
                  id="lastName"
                  placeholder="ex: Doe"
                  getFormValue={(value) =>
                     setFormData({
                        ...formData,
                        lastName: value,
                     })
                  }
               />
            </div>
            <Input
               label="Address"
               id="address"
               placeholder="Enter your specific address"
               getFormValue={(value) =>
                  setFormData({ ...formData, address: value })
               }
            />
            <div className="flex gap-4">
               <Input
                  label="State"
                  id="state"
                  placeholder="ex: Lagos"
                  getFormValue={(value) =>
                     setFormData({ ...formData, state: value })
                  }
               />
               <Input
                  label="Dater of Birth"
                  placeholder="yyyy-mm-dd"
                  id="dob"
                  type="date"
                  getFormValue={(value) =>
                     setFormData({ ...formData, dob: value })
                  }
               />
            </div>
            <Input
               label="Email"
               placeholder="Enter your email"
               id="email"
               type="email"
               getFormValue={(value) =>
                  setFormData({ ...formData, email: value })
               }
            />
            <Input
               label="Password"
               placeholder="Enter your password"
               id="password"
               type="password"
               getFormValue={(value) =>
                  setFormData({ ...formData, password: value })
               }
            />

            <Button
               onclick={() => {
                  console.log(formData);
               }}
            >
               Sign up
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
         </div>
      </div>
   );
}
