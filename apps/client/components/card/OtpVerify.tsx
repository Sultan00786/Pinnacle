import { Button } from "@repo/ui/component";
import { useState } from "react";
import OtpInput from "react-otp-input";
import BackButton from "./BackButton";

export default function OtpVerify() {
   const [otp, setOtp] = useState("");
   const [confirmObj, setConfirmObj] = useState("");

   const handleChange = (code: string) => setOtp(code);

   const renderInput = (props: any) => <input {...props} />;

   const onSubmit = async () => {
      const confirmationResult = window.confirmationResult;
      confirmationResult
      .confirm(otp)
      .then((result) => {
         
      })
      .catch((error) => {
         console.error(
            "Error verifying code:",
            error.message
         );
      });
   };

   return (
      <div className="App">
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
      </div>
   );
}
