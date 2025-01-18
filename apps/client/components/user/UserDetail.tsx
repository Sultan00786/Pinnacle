"use client";
import { Avatar, Card, Progress } from "@nextui-org/react";
import {
   HandCoinsIcon,
   IdCard,
   Notebook,
   Plus,
   ShoppingBag,
   Tv2,
} from "lucide-react";
import Image from "next/image";
import BgCover from "../../../client/public/userBgCover.png";
import AtmCardComponent from "../account/AtmCardComponent";
import { AccountType, UserType } from "@repo/interface/interface";

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
            <div className="flex items-center justify-between pt-4 border-t-2">
               <div className="flex items-center gap-2">
                  <IdCard className="h-7 w-7" />
                  <h3 className="font-semibold">My Banks</h3>
               </div>
               <button className="text-primary hover:text-primary/80">
                  <Plus className="h-5 w-5" />
               </button>
            </div>
            <div className="relative top-0 -mt-2 border-b-2 h-[250px]">
               <div className=" absolute right-2 z-30">
                  <AtmCardComponent account={accounts[0]} />
               </div>
               <div className=" absolute top-6 -right-4">
                  <AtmCardComponent account={accounts[0]} className="bg-gradient-to-r from-orange-500 to-red-400" />
               </div>
            </div>

            <div>
               <div className="flex items-center gap-2 py-3">
                  <Notebook className="h-5 w-5" />
                  <h3 className="font-semibold">My Budgets</h3>
               </div>

               <div>
                  <Card shadow="none" className="bg-purple-100/50 p-[14px]">
                     <div className=" flex gap-2 items-center justify-evenly">
                        <Avatar
                           size="sm"
                           showFallback
                           fallback={
                              <div>
                                 <Tv2 width={20} color="purple" />
                              </div>
                           }
                           className="bg-purple-200/70"
                        />
                        <div className=" w-[80%]">
                           <Progress
                              classNames={{
                                 base: "max-w-md",
                                 track: "bg-purple-100/80",
                                 indicator: "bg-purple-500",
                                 label: "tracking-wider font-semibold text-purple-600",
                                 value: "text-purple-500",
                              }}
                              label="Subcriptions"
                              formatOptions={{
                                 style: "currency",
                                 currency: "USD",
                              }}
                              radius="md"
                              showValueLabel={true}
                              size="sm"
                              value={65}
                           />
                        </div>
                     </div>
                  </Card>
                  <Card shadow="none" className="bg-blue-100/50 p-[14px] mt-3">
                     <div className=" flex gap-2 items-center justify-evenly">
                        <Avatar
                           size="sm"
                           showFallback
                           fallback={
                              <div>
                                 <ShoppingBag width={20} color="blue" />
                              </div>
                           }
                           className="bg-blue-200/70"
                        />
                        <div className=" w-[80%]">
                           <Progress
                              classNames={{
                                 base: "max-w-md",
                                 track: "bg-blue-100/80",
                                 indicator: "bg-blue-500",
                                 label: "tracking-wider font-semibold text-blue-600",
                                 value: "text-blue-500",
                              }}
                              label="Food and Shoping"
                              formatOptions={{
                                 style: "currency",
                                 currency: "USD",
                              }}
                              radius="md"
                              showValueLabel={true}
                              size="sm"
                              value={90}
                           />
                        </div>
                     </div>
                  </Card>
                  <Card shadow="none" className="bg-green-100/50 p-[14px] mt-3">
                     <div className=" flex gap-2 items-center justify-evenly">
                        <Avatar
                           size="sm"
                           showFallback
                           fallback={
                              <div>
                                 <HandCoinsIcon width={20} color="green" />
                              </div>
                           }
                           className="bg-green-200/70"
                        />
                        <div className=" w-[80%]">
                           <Progress
                              classNames={{
                                 base: "max-w-md",
                                 track: "bg-green-100/80",
                                 indicator: "bg-green-500",
                                 label: "tracking-wider font-semibold text-green-600",
                                 value: "text-green-500",
                              }}
                              label="Saving"
                              formatOptions={{
                                 style: "currency",
                                 currency: "USD",
                              }}
                              radius="md"
                              showValueLabel={true}
                              size="sm"
                              value={30}
                           />
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserDetail;
