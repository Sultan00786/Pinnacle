"use client";
import React, { HTMLAttributes } from "react";
import masterCardimg from "../../../client/public/masterCardimg.png";
import Image from "next/image";

function AtmCardComponent({ className = "" }: { className?: string }) {
   return (
      <div>
         <div
            className={` ${className} relative m-auto h-48 w-80 rounded-xl bg-gradient-to-r from-pink-700 to-purple-400 text-white shadow-lg transition-transform sm:h-56 sm:w-96 scale-75`}
         >
            <div className="absolute top-4 w-full px-8 sm:top-8">
               <div className="flex justify-between">
                  <div className="">
                     <p className="font-light">Name</p>
                     <p className="font-medium tracking-widest">
                        Carter Mullen
                     </p>
                  </div>
                  <Image
                     className="object-contain"
                     src={masterCardimg}
                     alt="masterCardimg"
                     width={70}
                  />
               </div>
               <div className="pt-1">
                  <p className="font-light">Card Number</p>
                  <p className="tracking-more-wider font-medium">
                     4312 567 7890 7864
                  </p>
               </div>
               <div className="pt-4 pr-6 sm:pt-6">
                  <div className="flex justify-between">
                     <div className="">
                        <p className="text-xs font-light">Valid From</p>
                        <p className="text-base font-medium tracking-widest">
                           11/15
                        </p>
                     </div>
                     <div className="">
                        <p className="text-xs font-light">Expiry</p>
                        <p className="text-base font-medium tracking-widest">
                           03/25
                        </p>
                     </div>

                     <div className="">
                        <p className="text-xs font-light">CVV</p>
                        <p className="tracking-more-wider text-sm font-bold">
                           521
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AtmCardComponent;
