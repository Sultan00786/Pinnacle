"use client";
import {
   AccountType,
   RootState,
   TransactionType,
   UserType,
} from "@repo/interface/interface";
import { DashboardHeadline, Loader, PurbleButton } from "@repo/ui/component";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ChartCard from "../../../components/chart/ChartCard";
import TransactionTableWithTabs from "../../../components/transaction/TransactionTableWithTabs";
import UserDetail from "../../../components/user/UserDetail";
import { fuctionTxs } from "../../../lib/fetchTransaction";
import getUserDetails from "../../lib/support/getUserDetails";
import RootLaoding from "../../loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../../packages/store/src/slice/loading";

function Dashboard() {
   let temp;
   const router = useRouter();
   const dispatch = useDispatch();
   // const [loading, setLoading] = useState(false);
   const loading = useSelector((state: RootState) => state.loading);
   const [tableData, setTableData] = useState<TransactionType[]>(
      [] as TransactionType[]
   );
   const [user, setUser] = useState<UserType>({} as UserType);
   const [accounts, setAccounts] = useState<AccountType[]>([] as AccountType[]);

   async function func() {
      temp = dispatch(setLoading(true));
      await fuctionTxs(setTableData);
      const res = await getUserDetails();
      if (res.user) {
         setUser(res.user);
         setAccounts(res.user.accounts);
      }
      temp = dispatch(setLoading(false));
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
         <div className="w-[900px] h-full flex flex-col px-6 gap-6 relative">
            <DashboardHeadline para="Access & manage your account and transactions efficiently.">
               <div>
                  Welcom,{" "}
                  <span className=" text-purple-700">{user.firstName}</span>
               </div>
            </DashboardHeadline>
            <ChartCard accounts={accounts} user={user} />
            <div className=" w-full">
               <div className=" flex justify-between -mt-[6px]">
                  <h2 className=" text-2xl font-extrabold">
                     Recent transactions
                  </h2>
                  <div>
                     <PurbleButton onClick={() => router.push("/history")}>
                        View All
                     </PurbleButton>
                  </div>
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
