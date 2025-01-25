import { Tab, Tabs } from "@nextui-org/react";
import { AccountType, TransactionType } from "@repo/interface/interface";
import BankCard from "./BankCard";
import TableComponent from "./TableComponent";

function TransactionTableWithTabs({
   table_data,
   accounts,
}: {
   table_data: TransactionType[];
   accounts: AccountType[];
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
            {accounts.map((tab) => (
               <Tab key={tab.source} title={tab.source}>
                  <div>
                     <div className=" mb-3">
                        <BankCard
                           name={tab.source}
                           amount={tab.balance / 100}
                        />
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
