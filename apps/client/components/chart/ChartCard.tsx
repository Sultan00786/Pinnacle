import React from "react";
import DoughnutChart from "./DoughnutChart";
import { Plus } from "lucide-react";

function ChartCard() {
   return (
      <div className=" flex items-center gap-5 p-5 border border-gray-300 rounded-xl w-full shadow-md ">
         <div className=" w-[130px] ">
            <DoughnutChart />
         </div>
         <div className=" w-full flex justify-between">
            <div className=" flex flex-col gap-5">
               <p className=" font-semibold">8_ Bank Accounts</p>
               <div className=" flex flex-col">
                  <p className=" text-gray-500">Total Current Balance</p>
                  <p className="text-3xl font-bold">$1,000,000_</p>
               </div>
            </div>
            <div className=" h-fit flex text-purple-400 hover:text-purple-600 cursor-pointer">
               <Plus />
               <p>Add bank</p>
            </div>
         </div>
      </div>
   );
}

export default ChartCard;
