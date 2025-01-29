"use client";
import { AccountType } from "@repo/interface/interface";
import Image from "next/image";
import masterCardimg from "../../../client/public/masterCardimg.png";

function AtmCardComponent({
   className = "",
   account,
}: {
   className?: string;
   account: AccountType;
}) {
   return (
      <div>
         <div
            className={` ${className} relative m-auto h-48 w-80 rounded-xl bg-gradient-to-r from-pink-700 to-purple-400 text-white shadow-lg transition-transform sm:h-56 sm:w-96 scale-[0.72]`}
         >
            <div className="absolute top-4 w-full px-8 sm:top-8">
               <div className="flex justify-between">
                  <div className="flex gap-2">
                     <p className="font-medium tracking-widest">
                        {account.source}
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
                  <p className="font-light">Card No.</p>
                  <p className="tracking-more-wider font-medium">
                     {account.accountNo.substring(0, 4) +
                        " " +
                        account.accountNo.substring(4, 8) +
                        " " +
                        account.accountNo.substring(8, 12) +
                        " " +
                        account.accountNo.substring(12, 16)}
                  </p>
               </div>
               <div className="pt-4 pr-6 sm:pt-6">
                  <div className="flex justify-between">
                     <div className="">
                        <p className="text-xs font-light">Valid From</p>
                        <p className="text-base font-medium tracking-widest">
                           --
                        </p>
                     </div>
                     <div className="">
                        <p className="text-xs font-light">Expiry</p>
                        <p className="text-base font-medium tracking-widest">
                           {account.expiryDate}
                        </p>
                     </div>

                     <div className="">
                        <p className="text-xs font-light">CVV</p>
                        <p className="tracking-more-wider text-sm font-bold">
                           {account.cvv}
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
