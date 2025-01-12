"use client";
import React, { Suspense } from "react";
import ChartCard from "../../../components/chart/ChartCard";
import TransactionTableWithTabs from "../../../components/transaction/TransactionTableWithTabs";
import { Button } from "@nextui-org/react";
import { DashboardHeadline, PurbleButton } from "@repo/ui/component";
import { Building2, PlusCircle } from "lucide-react";
import UserDetail from "../../../components/user/UserDetail";
import RootLaoding from "../../loading";

function Dashboard() {
   return (
      <div className="flex ">
         <div className="w-[900px] h-full flex flex-col px-6 gap-6">
            <DashboardHeadline
               children={
                  <div>
                     Welcom, <span className=" text-purple-700">Sultan</span>
                  </div>
               }
               para="Access & manage your account and transactions efficiently."
            />
            <ChartCard />
            <div className=" w-full">
               <div className=" flex justify-between">
                  <h2 className=" text-2xl font-extrabold">
                     Recent transactions
                  </h2>
                  <PurbleButton>View All</PurbleButton>
               </div>
               <Suspense fallback={<RootLaoding />}>
                  <TransactionTableWithTabs />
               </Suspense>
            </div>
         </div>

         <div>
            <UserDetail />
         </div>
      </div>
   );
}

export default Dashboard;
