"use client";
import React, { useState } from "react";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AddCardInputProps } from "@repo/interface/interface";

export default function AddCardForm() {
   const router = useRouter();
   const [expiryDate, setExpiryDate] = useState({
      month: "",
      year: "",
   });

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
   } = useForm<AddCardInputProps>();
 
   return (
      <div>
         <h1 className="text-4xl font-bold mb-2">
            Add New Card
         </h1>
         <p className="text-gray-500 mb-6">
            Securely add a new payment card to your account.
         </p>
         <form>
            <div className="flex gap-4 ">
               <div className=" w-[45%]">
                  <Input
                     label="Cardholder Name"
                     placeholder="ex: John Doe"
                     id="cardHolder"
                     register={register}
                     errors={errors}
                     maxLength={50}
                  />
               </div>
               <div className="col-span-2">
                  <Input
                     label="Phone Number"
                     placeholder="ex: 1234567890"
                     id="phone"
                     type="number"
                     register={register}
                     errors={errors}
                     maxLength={10}
                     minLength={10}
                  />
               </div>
            </div>
            <Input
               label="Card Number"
               placeholder="**** **** **** ****"
               id="cardNumber"
               type="number"
               register={register}
               errors={errors}
               maxLength={16}
               minLength={16}
            />

            <div className="flex gap-4">
               <ExpiryDateInput setExpiryDate={setExpiryDate} />

               <div className=" w-[100px]">
                  <Input
                     label="CVV"
                     placeholder="ex: 123"
                     id="cvv"
                     type="number"
                     register={register}
                     errors={errors}
                     maxLength={3}
                     minLength={3}
                  />
               </div>
            </div>

            <Button
               type="submit"
               onClick={handleSubmit((data) => {
                  console.log("Submitted");
                  console.log(data);
               })}
            >
               Next
            </Button>
            <p className="text-center text-gray-600 mt-4">
               Don't have an account?{" "}
               <span
                  onClick={() => router.push("/signup")}
                  className="text-sky-700 font-semibold cursor-pointer transition-all duration-150 hover:text-sky-900"
               >
                  Next
               </span>
            </p>
         </form>
      </div>
   );
}

type SetFormDataType = React.Dispatch<
   React.SetStateAction<{
      month: string;
      year: string;
   }>
>;

function ExpiryDateInput({
   setExpiryDate,
}: {
   setExpiryDate: SetFormDataType;
}) {
   return (
      <div>
         <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700"
         >
            Expiry Date
         </label>
         <div className="flex items-center mt-1">
            <input
               type="number"
               name="expiryDate"
               id="expiryDate"
               className=" w-[55px] p-1 pl-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
               placeholder="mm"
               onChange={(e) => {
                  setExpiryDate((prev) => ({
                     ...prev,
                     month: e.target.value,
                  }));
               }}
            />
            <div className=" w-4 h-9 flex items-center justify-center">
               <div className=" w-[2px] h-[33px] bg-gray-400 rotate-[18deg]"></div>
            </div>
            <input
               type="number"
               name="expiryDate"
               id="expiryDate"
               className=" w-[55px] p-1 pl-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
               placeholder="yy"
               onChange={(e) => {
                  setExpiryDate((prev) => ({
                     ...prev,
                     year: e.target.value,
                  }));
               }}
            />
         </div>
      </div>
   );
}
