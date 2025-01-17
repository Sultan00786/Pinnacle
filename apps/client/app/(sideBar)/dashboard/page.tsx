"use client";
import {
   AccountType,
   TransactionType,
   UserType,
} from "@repo/interface/interface";
import { DashboardHeadline, Loader, PurbleButton } from "@repo/ui/component";
import { Suspense, useEffect, useState } from "react";
import ChartCard from "../../../components/chart/ChartCard";
import TransactionTableWithTabs from "../../../components/transaction/TransactionTableWithTabs";
import UserDetail from "../../../components/user/UserDetail";
import { fuctionTxs } from "../../../lib/fetchTransaction";
import getUserDetails from "../../lib/support/getUserDetails";
import RootLaoding from "../../loading";

function Dashboard() {
   const [loading, setLoading] = useState(false);
   const [tableData, setTableData] = useState<TransactionType[]>(
      [] as TransactionType[]
   );
   const [user, setUser] = useState<UserType>({} as UserType);
   const [accounts, setAccounts] = useState<AccountType[]>([] as AccountType[]);

   async function func() {
      setLoading(true);
      await fuctionTxs(setTableData);
      const res = await getUserDetails();
      if (res.user) {
         setUser(res.user);
         setAccounts(res.user.accounts);
      }
      setLoading(false);
   }

   useEffect(() => {
      func();
   }, []);

   if (loading) {
      return (
         <div>
            <Loader />
         </div>
      );
   }
   return (
      <div className="flex ">
         <div className="w-[900px] h-full flex flex-col px-6 gap-6">
            <DashboardHeadline
               children={
                  <div>
                     Welcom,{" "}
                     <span className=" text-purple-700">{user.firstName}</span>
                  </div>
               }
               para="Access & manage your account and transactions efficiently."
            />
            <ChartCard accounts={accounts} user={user} />
            <div className=" w-full">
               <div className=" flex justify-between -mt-[6px]">
                  <h2 className=" text-2xl font-extrabold">
                     Recent transactions
                  </h2>
                  <PurbleButton>View All</PurbleButton>
               </div>
               <Suspense fallback={<RootLaoding />}>
                  <TransactionTableWithTabs
                     table_data={tableData}
                     accounts={accounts}
                  />
               </Suspense>
            </div>
         </div>

         <div>
            <UserDetail user={user} accounts={accounts} />
         </div>
      </div>
   );
}

export default Dashboard;
