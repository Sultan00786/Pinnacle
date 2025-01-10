import React from "react";
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   Tabs,
   Tab,
} from "@nextui-org/react";
import BankCard from "./BankCard";

const colums = ["Transcation", "Amount", "Status", "Date", "Category"];
const tabs = ["Bank 1", "Bank 2", "Bank 3", "Bank 4", "Bank 5", "Bank 6"];

function TransactionTableWithTabs() {
   return (
      <div className="w-full">
         <Tabs
            variant="underlined"
            classNames={{
               tabList: "gap-6 w-[750px] border-b border-divider p-0",
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
                     <Table
                        classNames={{
                           th: " bg-purple-500/80 text-white", // Change this to your desired color
                        }}
                     >
                        <TableHeader className="custom-header">
                           {colums.map((col) => (
                              <TableColumn>{col}</TableColumn>
                           ))}
                        </TableHeader>
                        <TableBody>
                           <TableRow key="1" className="border-b pb-1">
                              <TableCell>Tony Reichert</TableCell>
                              <TableCell>CEO</TableCell>
                              <TableCell>Active</TableCell>
                              <TableCell>Active</TableCell>
                              <TableCell>Active</TableCell>
                           </TableRow>
                           <TableRow key="2" className="border-b pb-1">
                              <TableCell>Zoey Lang</TableCell>
                              <TableCell>Technical Lead</TableCell>
                              <TableCell>Paused</TableCell>
                              <TableCell>Paused</TableCell>
                              <TableCell>Paused</TableCell>
                           </TableRow>
                           <TableRow key="3" className="border-b pb-1">
                              <TableCell>Jane Fisher</TableCell>
                              <TableCell>Senior Developer</TableCell>
                              <TableCell>Active</TableCell>
                              <TableCell>Active</TableCell>
                              <TableCell>Active</TableCell>
                           </TableRow>
                           <TableRow key="4">
                              <TableCell>William Howard</TableCell>
                              <TableCell>Community Manager</TableCell>
                              <TableCell>Vacation</TableCell>
                              <TableCell>Vacation</TableCell>
                              <TableCell>Vacation</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </div>
               </Tab>
            ))}
         </Tabs>
      </div>
   );
}

export default TransactionTableWithTabs;
