"use client";
import { Avatar } from "@nextui-org/react";
import { AccountType, UserType } from "@repo/interface/interface";
import { IdCard, LucideBadgeDollarSign, Plus } from "lucide-react";
import Image from "next/image";
import BgCover from "../../../client/public/userBgCover.png";
import AtmCardComponent from "../account/AtmCardComponent";
import AddMoneyCard from "./AddMoneyCard";

function UserDetail({
   user,
   accounts,
}: {
   user: UserType;
   accounts: AccountType[];
}) {
   return (
      <div className=" h-screen w-[396px] border-l">
         <div />
         <Image
            alt="Backgroun"
            src={BgCover}
            width={395}
            className="h-28 bg-gradient-to-r from-primary/10 to-primary/5"
         />
         <div className="p-4">
            <div className="flex flex-col items-start -mt-12 mb-4">
               <Avatar isBordered className=" w-16 h-16" />
               <h3 className="text-2xl font-semibold mt-2">
                  {user.firstName + " " + user.lastName}
               </h3>
               <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div>
               <div className="flex items-center justify-between pt-2 -mt-2 border-t-2">
                  <div className="flex items-center gap-2">
                     <LucideBadgeDollarSign className="h-7 w-7" />
                     <h3 className="font-semibold">Add Money</h3>
                  </div>
               </div>
               <div className="relative px-5  ">
                  <AddMoneyCard />
               </div>
            </div>

            <div>
               <div className="flex items-center justify-between pt-2 border-t-2 -mt-2">
                  <div className="flex items-center gap-2">
                     <IdCard className="h-7 w-7" />
                     <h3 className="font-semibold">My Banks</h3>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                     <Plus className="h-5 w-5" />
                  </button>
               </div>
               <div className="relative top-0 -mt-2 h-[220px] overflow-hidden">
                  <div className=" absolute -top-2 right-2 z-30">
                     {accounts[0] && <AtmCardComponent account={accounts[0]} />}
                  </div>
                  <div className=" absolute top-4 -right-4">
                     {accounts[0] && (
                        <AtmCardComponent
                           account={accounts[0]}
                           className="bg-gradient-to-r from-orange-500 to-red-400"
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserDetail;
