"use client";
import { AccountType, UserType } from "@repo/interface/interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import DoughnutChart from "./DoughnutChart";

function ChartCard({
   user,
   accounts,
}: {
   user: UserType;
   accounts: AccountType[];
}) {
   const router = useRouter();
   return (
      <div className=" flex items-center gap-5 p-2 border border-gray-300 rounded-xl w-full shadow-md ">
         <div className=" w-[110px] ">
            <DoughnutChart accounts={accounts} />
         </div>
         <div className=" w-full flex justify-between -ml-2">
            <div className=" flex flex-col gap-5">
               <p className=" font-semibold">
                  {user?.accounts?.length + " " + "Bank Accounts"}
               </p>
               <div className=" flex flex-col">
                  <p className=" text-gray-500">Total Current Balance</p>
                  <p className="text-3xl font-bold">
                     ${user?.totalBalance / 100}
                  </p>
               </div>
            </div>
            <div
               onClick={() => {
                  router.push("/connect");
               }}
               className=" h-fit flex text-purple-400 hover:text-purple-600 cursor-pointer"
            >
               <Plus />
               <p>Add Accounts</p>
            </div>
         </div>
      </div>
   );
}

export default ChartCard;
