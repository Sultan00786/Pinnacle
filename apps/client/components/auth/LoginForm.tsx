"use client";
import { LoginInputProps } from "@repo/interface/interface";
import { Button, Input } from "@repo/ui/component";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { isUserPresent } from "../../app/lib/action/isUserPresent";

export default function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginInputProps>();

   const router = useRouter();

   const onSubmit: SubmitHandler<LoginInputProps> = async (data) => {
      const toastId = toast.loading("Please wait");
      const presentRes = await isUserPresent(data.email);
      if (!presentRes.success) {
         toast.update(toastId, {
            render: presentRes.message,
            type: "error",
            isLoading: false,
            autoClose: 6000,
         });
         throw new Error(presentRes.message);
      }

      const response = await signIn("credentials", {
         email: data.email,
         password: data.password,
         firsName: null,
         redirect: false,
      });

      if (response?.status === 200) {
         toast.dismiss(toastId);
         router.push("/dashboard");
         toast.success("Login successful ✨");
      }
      if (response?.error) {
         toast.update(toastId, {
            render: response?.error,
            type: "error",
            isLoading: false,
            autoClose: 6000,
         });
         throw new Error(response?.error);
      }
   };

   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Log in</h1>
         <p className="text-gray-500 mb-6">
            Welcome back! Please enter your details.
         </p>
         <form onSubmit={handleSubmit(onSubmit)}>
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
               pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/}
            />

            <Button type="submit" onClick={handleSubmit(onSubmit)}>
               Login
            </Button>
            <p className="text-center text-gray-600 mt-4">
               {`Don't have an account?`}
               <span
                  onClick={() => router.push("/signup")}
                  className="text-purple-500 font-semibold cursor-pointer transition-all duration-150 hover:text-purple-700"
               >
                  Sign up
               </span>
            </p>
         </form>
      </div>
   );
}
