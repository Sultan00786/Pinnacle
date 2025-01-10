import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/react";
import React from "react";

function BankCard({ name, amount }: { name: string; amount: number }) {
   return (
      <div>
         <Card shadow="none" className="bg-purple-100/50 p-2">
            <CardBody>
               <div className="flex gap-3">
                  <div>
                     <Avatar
                        name={name}
                        size="md"
                        className="bg-purple-400 text-white"
                     />
                  </div>
                  <div className="-mt-[4px]">
                     <div className=" text-2xl flex flex-col gap font-bold">
                        <p className="text-purple-600">{name}</p>
                        <p className=" text-purple-700">${amount}</p>
                     </div>
                     <div></div>
                  </div>
               </div>
            </CardBody>
         </Card>
      </div>
   );
}

export default BankCard;
