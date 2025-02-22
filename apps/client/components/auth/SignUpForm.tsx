"use client";
import { SignUpIputProps } from "@repo/interface/interface";
import { setStep, setUser } from "@repo/store/recoil";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isUserPresent } from "../../app/lib/action/isUserPresent";

export default function SignUpForm() {
   const router = useRouter();
   const dispatch = useDispatch();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignUpIputProps>();

   const onSignUp: SubmitHandler<SignUpIputProps> = async (data) => {
      const toatId = toast.loading("Please wait");
      const response = await isUserPresent(data.email);
      if (response.success) {
         toast.update(toatId, {
            render: "This email is aready present, Enter different email",
            type: "error",
            isLoading: false,
            autoClose: 6000,
         });
         return;
      }

      dispatch(setUser(data));
      dispatch(setStep(2));
      toast.dismiss(toatId);
   };

   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">Sign up</h1>
         <p className="text-gray-600 mb-6">Please enter your details.</p>
         <form>
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
               pattern={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/}
            />

            <Button type="submit" onClick={handleSubmit(onSignUp)}>
               Next
            </Button>
            <p className="text-center text-gray-600 mt-4 pb-4">
               Already have an account?{" "}
               <span
                  onClick={() => router.push("/login")}
                  className="text-purple-500 font-semibold cursor-pointer transition-all duration-150 hover:text-purple-700"
               >
                  Login
               </span>
            </p>
         </form>
      </div>
   );
}
