"use client";
import { form, Textarea } from "@nextui-org/react";
import { Button, Input } from "@repo/ui/component";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import p2pTransaction from "../../app/lib/action/p2pTransaction";
import SelectBankSource from "../SelectBankSource";
import getUserDetails from "../../app/lib/support/getUserDetails";
import { AccountType } from "@repo/interface/interface";
import { IdCard } from "lucide-react";

interface TransferDetail {
   email: string;
   accountNumber: string;
   amount: number;
}

function TransferDetails() {
   const [selectSource, setSelectSource] = useState("");
   const [selectSourceNo, setSelectSourceNo] = useState("");
   const [accountsData, setAccountsData] = useState<
      { id: string; name: string }[]
   >([]);
   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<TransferDetail>();

   async function onSubmit(data: TransferDetail) {
      const toastId = toast.loading("Please wait...");
      const combine = {
         email: data.email,
         toAccountNumber: data.accountNumber,
         fromAccountNumber: selectSourceNo,
         amount: Number(data.amount * 100),
         source: selectSource,
      };
      const response = await p2pTransaction(combine);
      if (!response.success) {
         console.log(response.error);
         toast.update(toastId, {
            render: `${response.error}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
         });
         return;
      }
      toast.update(toastId, {
         render: "Transaction Successful",
         type: "success",
         isLoading: false,
         autoClose: 5000,
      });
   }

   useEffect(() => {
      async function func() {
         setLoading(true);
         const result = await getUserDetails();
         console.log(result);
         if (result.user?.accounts) {
            const data = result.user.accounts.map(
               (acc: AccountType, index: number) => ({
                  id: index.toString(),
                  name: acc.accountNo,
               })
            );
            setAccountsData(data);
         }

         setLoading(false);
      }
      func();
   }, []);

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
                     <p className="text-gray-600">Select Source Bank Number</p>
                     <p className="text-gray-400 text-sm">
                        Select your available bank account number
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <SelectBankSource
                        selectData={accountsData}
                        setSelectSource={setSelectSourceNo}
                     >
                        <div className=" flex items-center gap-2">
                           <IdCard className=" text-purple-500 " />
                           <p className=" text-gray-600">
                              Select Your Bank Number
                           </p>
                        </div>
                     </SelectBankSource>
                  </div>
               </div>
               <div className=" w-full flex gap-8 py-3 border-b">
                  <div className="w-1/2">
                     <p className=" text-gray-600">Select Source Bank</p>
                     <p className="text-gray-400 text-sm">
                        Select the bank account source you want to ransfer funds
                        from
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <SelectBankSource setSelectSource={setSelectSource} />
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
                     <p className=" text-gray-600">{`Recipent's Email Adress`}</p>
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
                        {`Recipent's Account Number`}
                     </p>
                  </div>
                  <div className=" w-full pr-[400px]">
                     <Input
                        placeholder="**** **** **** ****"
                        id="accountNumber"
                        type="text"
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
                  <Button type="submit" onClick={handleSubmit(onSubmit)}>
                     Transfer Money
                  </Button>
               </div>
            </div>
         </form>
      </div>
   );
}

export default TransferDetails;
