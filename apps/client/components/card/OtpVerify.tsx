import { Button } from "@repo/ui/component";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import BackButton from "./BackButton";
import { signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootOptions } from "react-dom/client";
import { RootState } from "@repo/interface/interface";
import { useRouter } from "next/navigation";
import { createAccount } from "../../app/lib/action/createAccount";
import { nextAuthSignUp } from "../../lib/nextAuthSignupCall";
import { Id, toast } from "react-toastify";
import MsgOtp from "../toast/MsgOtp";

export default function OtpVerify() {
   const [otp, setOtp] = useState("");
   const handleChange = (code: string) => setOtp(code);
   const renderInput = (props: any) => <input {...props} />;

   const router = useRouter();

   const { user } = useSelector(
      (state: RootState) => state.auth
   );
   const account = useSelector(
      (state: RootState) => state.account
   );

   async function afterVerification(toastLoaing:Id) {
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
         })
         console.error("Sign-in failed", response);
         return;
      }
      const res = await nextAuthSignUp(account);
      if (res.status) {
         toast.dismiss(toastLoaing)
         router.push("/dashboard");
      }
   }

   const onSubmit = async () => {
      const toastLoaing = toast.loading("Please wait");
      const confirmationResult = window.confirmationResult;
      confirmationResult
         .confirm(otp)
         .then((result) => {
            afterVerification(toastLoaing)
         })
         .catch((error) => {
            toast.update(toastLoaing, {
               render: "Error occure while verifying OTP",
               type: "error",
               isLoading: false,
               autoClose: 3000,
            })
            console.error(
               "Error verifying code:",
               error.message
            );
         });
   };

   useEffect(()=> {
      const toastId = "otp-instruction"
      if(!toast.isActive(toastId)){
         toast(MsgOtp, {
            toastId: toastId,
            closeButton: false,
            autoClose: false,
         });
      }
   }, [])

   return (
      <form className="App">
         <h1 className="text-4xl font-bold mb-2">Verify OTP</h1>
         <p className="text-gray-500 mb-6">
            Enter the OTP sent to your phone number to complete
            the verification process.
         </p>
         <OtpInput
            value={otp}
            inputType="tel"
            onChange={handleChange}
            numInputs={6}
            shouldAutoFocus={true}
            renderInput={renderInput}
            renderSeparator={
               <span style={{ width: "8px" }}></span>
            }
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
         <Button type="submit" onClick={onSubmit}>
            Verify
         </Button>
         <BackButton step={2} />
      </form>
   );
}
