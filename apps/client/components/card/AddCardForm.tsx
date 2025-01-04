"use client";
import {
   AddCardInputProps,
   RootState,
} from "@repo/interface/interface";
import { Button, Input } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUpRecaptcha } from "../../lib/firebaseAuth";
import { setAccount, setStep } from "@repo/store/recoil";
import BackButton from "./BackButton";
import { ConfirmationResult } from "firebase/auth";

export default function AddCardForm() {
   const router = useRouter();
   const { user } = useSelector(
      (state: RootState) => state.auth
   );
   const dispatch = useDispatch();
   const [expiryDate, setExpiryDate] = useState({
      month: "",
      year: "",
   });

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
   } = useForm<AddCardInputProps>();

   const onSubmit: SubmitHandler<AddCardInputProps> = async (
      data
   ) => {
      try {
         const respone = await setUpRecaptcha(
            "+91" + data.phone,
            "recaptcha-div"
         );

         window.confirmationResult = respone;

         const combineData = { ...data, ...expiryDate };
         dispatch(setAccount(combineData));
         dispatch(setStep(3));
      } catch (error) {
         console.error(error);
      }
   };

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

            <div id="recaptcha-div"></div>

            <Button
               type="submit"
               onClick={handleSubmit(onSubmit)}
            >
               Next
            </Button>
            <BackButton step={1} />
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
