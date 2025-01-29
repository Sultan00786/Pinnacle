"use client";

import { AccountType, UserType } from "@repo/interface/interface";
import { DashboardHeadline, Loader } from "@repo/ui/component";
import React, { useEffect, useState } from "react";
import getUserDetails from "../../lib/support/getUserDetails";
import { toast } from "react-toastify";
import AtmCardComponent from "../../../components/account/AtmCardComponent";
import { Progress } from "@nextui-org/react";
//
function MyBanks() {
   const [user, setUser] = useState<UserType>({} as UserType);
   const [loading, setLoading] = useState(false);

   async function getData() {
      setLoading(true);
      const response = await getUserDetails();
      if (response.user) setUser(response.user);
      else {
         toast.error(response.message);
      }
      setLoading(false);
   }

   useEffect(() => {
      getData();
   }, []);

   if (loading) {
      return <Loader />;
   }

   return (
      <div>
         <div className="px-5 overflow-hidden">
            <DashboardHeadline para={"Easily Manage your Banking Activities"}>
               My Bank Accounts
            </DashboardHeadline>
            <h2 className=" font-semibold text-xl mt-4 ">
               <span className=" text-purple-600">Total Balance: </span>$
               {user.totalBalance / 100}
            </h2>
            <div className=" mt-6">
               <h3 className=" font-semibold text-[16px] ">
                  Your Bank Accounts
               </h3>
               <div className="  ">
                  <div className=" absolute top-48 left-[255px] z-10 grid grid-cols-3 grid-rows-2 gap-y-4">
                     {user.accounts?.map((account, index) => (
                        <div
                           key={index}
                           className=" flex flex-col items-center"
                        >
                           <div className="scale-[1.23]">
                              <AtmCardComponent
                                 account={account as AccountType}
                              />
                           </div>
                           <div className="w-[87%]">
                              <Progress
                                 classNames={{
                                    base: "max-w-md",
                                    track: "drop-shadow-md border border-default",
                                    indicator:
                                       "bg-gradient-to-r from-pink-600 to-purple-500",
                                    label: "tracking-wider font-medium text-default-600",
                                    value: "text-foreground/60",
                                 }}
                                 formatOptions={{
                                    style: "currency",
                                    currency: "USD",
                                 }}
                                 label="Balance"
                                 radius="sm"
                                 showValueLabel={true}
                                 size="md"
                                 value={account.balance / 100}
                                 maxValue={user.totalBalance / 100}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default MyBanks;
