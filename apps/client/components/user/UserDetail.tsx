"use client";
import { Avatar } from "@nextui-org/react";
import { Building2, IdCard, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import BgCover from "../../../client/public/userBgCover.png";
import AtmCardComponent from "../account/AtmCardComponent";

function UserDetail() {
   return (
      <div className=" h-screen w-[390px] border-l">
         <div />
         <Image
            alt="Backgroun"
            src={BgCover}
            width={390}
            className="h-28 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg"
         />
         <div className="p-4">
            <div className="flex flex-col items-start -mt-12 mb-4">
               <Avatar isBordered className=" w-16 h-16" />
               <h3 className="text-2xl font-semibold mt-2">Sultan Ali</h3>
               <p className="text-sm text-muted-foreground">
                  adrian.davis@example.com
               </p>
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
                  <AtmCardComponent />
               </div>
               <div className=" absolute top-6 -right-4">
                  <AtmCardComponent className="bg-gradient-to-r from-orange-500 to-red-400" />
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserDetail;
