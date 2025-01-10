"use client";
import React from "react";
import ChartCard from "../../../components/chart/ChartCard";
import TransactionTableWithTabs from "../../../components/transaction/TransactionTableWithTabs";
import { Button } from "@nextui-org/react";
import { PurbleButton } from "@repo/ui/component";

function Dashboard() {
   return (
      <div>
         <div className=" w-[800px] flex flex-col px-6 gap-6">
            <div className=" flex flex-col gap-1 mt-10">
               <h1 className=" font-bold text-3xl">
                  Welcom, <span className=" text-purple-700">Sultan</span>
               </h1>
               <p className=" text-gray-500">
                  Access & manage your account and transactions efficiently.
               </p>
            </div>
            <ChartCard />
            <div className=" w-full">
               <div className=" flex justify-between">
                  <h2 className=" text-2xl font-extrabold">
                     Recent transactions
                  </h2>
                  <PurbleButton>View All</PurbleButton>
               </div>
               <div className=" w-full">
                  <TransactionTableWithTabs />
               </div>
            </div>
         </div>

         <div></div>
      </div>
   );
}

export default Dashboard;
