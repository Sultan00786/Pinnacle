"use client";
import {
   Chip,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
} from "@nextui-org/react";
import { TransactionType } from "@repo/interface/interface";
import { Dot } from "lucide-react";
const colums = ["Transcation", "Amount", "Status", "Date", "Category"];

function TableComponent({ table_data }: { table_data: TransactionType[] }) {
   return (
      <div>
         <Table
            classNames={{
               th: " bg-purple-500/80 text-white",
            }}
         >
            <TableHeader className="custom-header">
               {colums.map((col) => (
                  <TableColumn key={col}>{col}</TableColumn>
               ))}
            </TableHeader>
            {table_data !== undefined && table_data.length !== 0 ? (
               <TableBody>
                  {table_data.map((tx: TransactionType, index) => (
                     <TableRow
                        key={tx.id + "-" + index}
                        className={`${index !== 0 && "border-t"} ${tx.status === "Success" ? "bg-green-100/30" : tx.status === "Declined" ? "bg-red-100/30" : ""} pb-1`}
                     >
                        <TableCell>
                           {tx.reciever.firstName + " " + tx.reciever.lastName}
                        </TableCell>
                        <TableCell>{"$" + tx.amount / 100}</TableCell>
                        <TableCell>
                           <Chip
                              variant="flat"
                              classNames={{
                                 base: `${tx.status === "Success" ? "bg-green-200/30" : tx.status === "Declined" ? "bg-red-200/30" : "bg-gray-200/30"}`,
                                 content: `${tx.status === "Success" ? "text-green-500" : tx.status === "Declined" ? "text-red-500" : "text-gray-800"}`,
                              }}
                           >
                              <div className=" flex items-center justify-center rounded-r-full rounded-l-full -ml-3 ">
                                 <Dot size={30} className="p-0" />
                                 <p className="-ml-2">{tx.status}</p>
                              </div>
                           </Chip>
                        </TableCell>
                        <TableCell>{tx.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                           <Chip
                              variant="bordered"
                              color={`${tx.category === "Groceries" ? "warning" : tx.category === "Food" ? "danger" : "success"}`}
                           >
                              <div className=" flex items-center justify-center rounded-r-full rounded-l-full -ml-3 ">
                                 <Dot size={30} className="p-0" />
                                 <p className="-ml-2">{tx.category}</p>
                              </div>
                           </Chip>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            ) : (
               <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
         </Table>
      </div>
   );
}

export default TableComponent;
