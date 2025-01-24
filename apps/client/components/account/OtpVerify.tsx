"use client";
import { RootState } from "@repo/interface/interface";
import { Button } from "@repo/ui/component";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Id, toast } from "react-toastify";
import { nextAuthSignUp } from "../../lib/nextAuthSignupCall";
import MsgOtp from "../toast/MsgOtp";
import BackButton from "./BackButton";
import { setAccount, setStep, setUser } from "@repo/store/recoil";

export default function OtpVerify({ isSignUp = true }: { isSignUp?: boolean }) {
   const [otp, setOtp] = useState("");
   const handleChange = (code: string) => setOtp(code);
   const renderInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
      <input {...props} />
   );

   const router = useRouter();
   const dispatch = useDispatch();

   const { user } = useSelector((state: RootState) => state.auth);
   const account = useSelector((state: RootState) => state.account);

   async function createAccout(toastLoaing: Id) {
      const res = await nextAuthSignUp(account);
      if (res.status) {
         const setUserResult = dispatch(setUser(null));
         const setAccountResult = dispatch(setAccount(null));
         if (setUserResult && setAccountResult) {
            console.log(setUserResult);
            console.log(setAccountResult);
         }
         toast.dismiss(toastLoaing);
         if (isSignUp) toast.success("Signup Done 🎉✨");
         toast.success("Account Created ✔✔");
         if (isSignUp) router.push("/dashboard");
         dispatch(setStep(1));
      }
   }

   async function afterVerificationWithSignup(toastLoaing: Id) {
      try {
         const response = await signIn("credentials", {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            password: user?.password,
            address: user?.address,
            dob: user?.dob,
            state: user?.state,
            redirect: false,
         });

         if (response?.status !== 200) {
            toast.update(toastLoaing, {
               render: "Error occure while verifying OTP",
               type: "error",
               isLoading: false,
               autoClose: 3000,
            });
            console.error("Sign-in failed", response);
            return;
         }
         await createAccout(toastLoaing);
      } catch (error) {
         console.log(error);
         toast.update(toastLoaing, {
            render: "Error occure while verifying OTP",
            type: "error",
            isLoading: false,
            autoClose: 3000,
         });
      }
   }

   const onSubmit = async () => {
      const toastLoaing = toast.loading("Please wait");
      const confirmationResult = window.confirmationResult;
      confirmationResult
         .confirm(otp)
         .then(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isSignUp
               ? afterVerificationWithSignup(toastLoaing)
               : createAccout(toastLoaing);
         })
         .catch((error) => {
            toast.update(toastLoaing, {
               render: "Error occure while verifying OTP",
               type: "error",
               isLoading: false,
               autoClose: 3000,
            });
            console.error("Error verifying code:", error.message);
         });
   };

   useEffect(() => {
      const toastId = "otp-instruction";
      if (!toast.isActive(toastId)) {
         toast(MsgOtp, {
            toastId: toastId,
            closeButton: false,
            autoClose: false,
         });
      }
   }, []);

   return (
      <form className="App">
         <h1 className="text-4xl font-bold mb-2">Verify OTP</h1>
         <p className="text-gray-500 mb-6">
            Enter the OTP sent to your phone number to complete the verification
            process.
         </p>
         <OtpInput
            value={otp}
            inputType="tel"
            onChange={handleChange}
            numInputs={6}
            shouldAutoFocus={true}
            renderInput={renderInput}
            renderSeparator={<span style={{ width: "8px" }}></span>}
            inputStyle={{
               border: "2px solid",
               borderColor: "GrayText",
               borderRadius: "8px",
               width: "45px",
               height: "45px",
               fontSize: "20px",
               color: "#000",
               fontWeight: "400",
               caretColor: "blue",
            }}
         />
         <Button onClick={() => onSubmit()}>Verify</Button>
         <BackButton step={2} />
      </form>
   );
}
