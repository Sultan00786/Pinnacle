"use client";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import { Button, Input } from "@repo/ui/component";
import { CreditCardIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const data = [
   "Pinnacle Bank",
   "Bank of America",
   "Bank of Austrailia",
   "Bank of India",
   "Bank of Japan",
   "Bank of Canada",
];

interface TransferDetail {
   email: string;
   accountNumber: number;
   amount: number;
}

function TransferDetails() {
   //    const [transfer, setTransfer] = useState({
   //       email: "",
   //       accountNumber: "",
   //       amount: "",
   //    });
   const [selectSource, setSelectSource] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<TransferDetail>();
   return (
      <div className="w-full">
         <form className=" w-full">
            <div>
               <div className=" border-b py-3">
                  <p className="text-lg font-semibold">Transfer details</p>
                  <p className=" text-gray-400">
                     Enter the deatils of the recipient
                  </p>
               </div>
               <div className=" w-full flex gap-8 py-3 border-b">
                  <div className="w-1/2">
                     <p className=" text-gray-600">Select Source Bank</p>
                     <p className="text-gray-400 text-sm">
                        Select the bank account you want to ransfer funds from
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Select
                        variant="bordered"
                        label={
                           <div className=" flex gap-2 items-center text-gray-600">
                              <CreditCardIcon className=" text-purple-500 " />
                              <p>Select Source of Account</p>
                           </div>
                        }
                        labelPlacement="outside"
                     >
                        {data.map((item) => (
                           <SelectItem
                              onSelect={() => setSelectSource(item)}
                              key={item}
                              value={item}
                           >
                              {item}
                           </SelectItem>
                        ))}
                     </Select>
                  </div>
               </div>
               <div className=" w-full flex gap-8 py-3 border-b">
                  <div className="w-1/2">
                     <p className="text-gray-600">Transfer Note (Optional)</p>
                     <p className="text-gray-400 text-sm">
                        Select the bank account you want to ransfer funds from
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Textarea
                        isClearable
                        className="max-w-full"
                        defaultValue="I hope this message finds you well. I am transferring $100 to your account for fun. Please confirm once you receive it."
                        label="Description (Optional)"
                        placeholder="Description"
                        variant="bordered"
                        // eslint-disable-next-line no-console
                        onClear={() => console.log("textarea cleared")}
                     />
                  </div>
               </div>
            </div>
            <div>
               <div className=" border-b py-3">
                  <p className="text-lg font-semibold">
                     Bank account details of the recipient
                  </p>
                  <p className=" text-gray-400">
                     Enter the deatils of the recipient
                  </p>
               </div>
               <div className=" w-full flex gap-8 py-3 border-b">
                  <div className="w-1/2">
                     <p className=" text-gray-600">Recipent's Email Adress</p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Input
                        placeholder="Jon1234@gmail.com"
                        id="email"
                        type="email"
                        register={register}
                        errors={errors}
                        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
                     />
                  </div>
               </div>
               <div className=" w-full flex gap-8 py-3 border-b">
                  <div className="w-1/2">
                     <p className=" text-gray-600">
                        Recipient's Bank Account Number
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Input
                        placeholder="**** **** **** ****"
                        id="accountNumber"
                        type="number"
                        register={register}
                        errors={errors}
                        maxLength={16}
                        minLength={16}
                     />
                  </div>
               </div>
               <div className=" w-full flex gap-8 py-3 ">
                  <div className="w-1/2">
                     <p className=" text-gray-600">Amount</p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Input
                        placeholder="$2000"
                        id="amount"
                        type="number"
                        register={register}
                        errors={errors}
                        minLength={1}
                     />
                  </div>
               </div>
               <div className=" w-full pr-[400] -mt-3">
                  <Button>Transfer Money</Button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default TransferDetails;
