"use client";
import React from "react";
import DoughnutChart from "../../../components/chart/DoughnutChart";
import { Plus } from "lucide-react";
import ChartCard from "../../../components/chart/ChartCard";
import TransactionTableWithTabs from "../../../components/transaction/TransactionTableWithTabs ";

function Dashboard() {
   return (
      <div>
         <div className=" w-[800px] flex flex-col px-6 gap-6">
            <div className=" flex flex-col gap-1 mt-16">
               <h1 className=" font-bold text-3xl">
                  Welcom, <span className=" text-purple-700">Sultan</span>
               </h1>
               <p className=" text-gray-500">
                  Access & manage your account and transactions efficiently.
               </p>
            </div>
            <ChartCard />
            <div>
               <h2>Recent transactions</h2>
               <TransactionTableWithTabs />
            </div>
         </div>

         <div></div>
      </div>
   );
}

export default Dashboard;
