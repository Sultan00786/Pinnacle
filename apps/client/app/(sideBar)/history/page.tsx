"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/transaction/TableComponent";
import getTransaction from "../../lib/support/getTransaction";
import { toast } from "react-toastify";
import { TransactionType } from "@repo/interface/interface";
import { DashboardHeadline, Loader } from "@repo/ui/component";
import { fuctionTxs } from "../../../lib/fetchTransaction";
import SelectBankSource from "../../../components/SelectBankSource";
import { Filter, FilterIcon, ListFilter } from "lucide-react";

const data = [
   { id: "0", name: "All" },
   { id: "1", name: "Food" },
   { id: "2", name: "Groceries" },
   { id: "3", name: "Subscirptions" },
];

function TransactionHistrory() {
   const [loading, setLoading] = useState(false);
   const [tableData, setTableData] = useState<TransactionType[]>(
      [] as TransactionType[]
   );
   const [select, setSelect] = useState("");

   useEffect(() => {
      fuctionTxs(setLoading, setTableData, true);
   }, []);

   useEffect(() => {
      fuctionTxs(setLoading, setTableData, true, select);
   }, [select]);

   if (loading) {
      return (
         <div>
            <Loader />
         </div>
      );
   }

   return (
      <div className=" px-6">
         <DashboardHeadline
            children={"Transaction History"}
            para="Gain Insights and Track Your Transactions Over Time"
         />
         <div className="flex justify-between items-center mt-4 mb-2">
            <h1 className="text-xl font-semibold">Transaction History</h1>
            <div className="w-[13%]">
               <SelectBankSource
                  setSelectSource={setSelect}
                  defaultValue="All"
                  selectData={data}
                  children={
                     <div className="className= w-fit flex gap-2 items-center text-gray-600">
                        <ListFilter size={20} />
                        <p>Apply Filter</p>
                     </div>
                  }
               />
            </div>
         </div>
         <TableComponent table_data={tableData} />
      </div>
   );
}

export default TransactionHistrory;
