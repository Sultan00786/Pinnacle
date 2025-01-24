import { Button, Input } from "@repo/ui/component";
import { Landmark } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { creatOnRampTransaction } from "../../app/lib/action/createOnRampTransaction";
import SelectBankSource from "../SelectBankSource";

interface PropsType {
   amount: number;
   accountNo: number;
}

const SUPPORTED_BANK = [
   {
      name: "Axis Bank",
      id: "https://www.axisbank.com/",
   },
   {
      name: "HDFC Bank",
      id: "https://netbanking.hdfcbank.com/netbanking/",
   },
];

function AddMoneyCard() {
   const [select, setSelect] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<PropsType>();

   const onSubmit: SubmitHandler<PropsType> = async (data) => {
      const tostId = toast.loading("Please wait");
      const res = await creatOnRampTransaction(
         data.amount,
         data.accountNo,
         select
      );
      if (res.success) {
         window.location.href =
            SUPPORTED_BANK.find((bank) => bank.name === select)?.id || "";
      } else toast.error(res.message);
      toast.dismiss(tostId);
   };

   return (
      <div className=" mb-6">
         <div className="mt-8">
            <SelectBankSource
               children={
                  <div>
                     <div className="className= w-fit flex gap-2 items-center text-gray-600">
                        <Landmark className=" text-purple-500 " />
                        <p>Select Bank</p>
                     </div>
                  </div>
               }
               setSelectSource={setSelect}
               selectData={SUPPORTED_BANK}
            />
         </div>
         <div className="mt-4 -mb-3">
            <Input
               id="accountNo"
               type="number"
               placeholder="Enter account number"
               minLength={16}
               maxLength={16}
               register={register}
               errors={errors}
            />
            <Input
               id="amount"
               type="number"
               placeholder="Enter amount"
               minLength={1}
               register={register}
               errors={errors}
            />
         </div>
         <Button variant="Secondary" onClick={handleSubmit(onSubmit)}>
            Add Money
         </Button>
      </div>
   );
}

export default AddMoneyCard;
