import { Tab, Tabs } from "@nextui-org/react";
import { TransactionType } from "@repo/interface/interface";
import { useEffect, useState } from "react";
import { fuctionTxs } from "../../lib/fetchTransaction";
import BankCard from "./BankCard";
import TableComponent from "./TableComponent";
import { Loader } from "@repo/ui/component";

const tabs = ["Bank 1", "Bank 2", "Bank 3", "Bank 4", "Bank 5", "Bank 6"];

function TransactionTableWithTabs({
   table_data,
}: {
   table_data: TransactionType[];
}) {
   return (
      <div className="w-full h-full">
         <Tabs
            variant="underlined"
            classNames={{
               tabList: "gap-6 w-[850px] border-b border-divider p-0",
               cursor: "w-full bg-purple-500",
               tab: "max-w-fit px-0 h-12 text-[15px] font-semibold",
               tabContent: "group-data-[selected=true]:text-purple-500",
            }}
         >
            {tabs.map((tab) => (
               <Tab key={tab} title={tab}>
                  <div>
                     <div className=" mb-3">
                        <BankCard name={tab} amount={5050.98} />
                     </div>
                     <TableComponent table_data={table_data} />
                  </div>
               </Tab>
            ))}
         </Tabs>
      </div>
   );
}

export default TransactionTableWithTabs;
