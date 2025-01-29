"use client";
import { RootState, TransactionType } from "@repo/interface/interface";
import { DashboardHeadline, Loader } from "@repo/ui/component";
import { ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectBankSource from "../../../components/SelectBankSource";
import TableComponent from "../../../components/transaction/TableComponent";
import { fuctionTxs } from "../../../lib/fetchTransaction";
import { setLoading } from "../../../../../packages/store/src/slice/loading";

const data = [
   { id: "0", name: "All" },
   { id: "1", name: "Food" },
   { id: "2", name: "Groceries" },
   { id: "3", name: "Subscirptions" },
];

function TransactionHistrory() {
   let temp;
   const dispatch = useDispatch();
   const loading = useSelector((state: RootState) => state.loading);
   const [tableData, setTableData] = useState<TransactionType[]>(
      [] as TransactionType[]
   );
   const [select, setSelect] = useState("All");

   useEffect(() => {
      async function func() {
         temp = dispatch(setLoading(true));
         await fuctionTxs(setTableData, true, select);
         temp = dispatch(setLoading(false));
      }
      func();
   }, [select]);

   if (loading) {
      return (
         <div>
            <Loader />
         </div>
      );
   }

   return (
      <div className=" px-6 overflow-x-hidden">
         <DashboardHeadline para="Gain Insights and Track Your Transactions Over Time">
            Transaction History
         </DashboardHeadline>
         <div className="flex justify-between items-center mt-4 mb-2">
            <h1 className="text-xl font-semibold">Transaction History</h1>
            <div className="w-[13%]">
               <SelectBankSource
                  setSelectSource={setSelect}
                  defaultValue="All"
                  selectData={data}
               >
                  <div className="className= w-fit flex gap-2 items-center text-gray-600">
                     <ListFilter size={20} />
                     <p>Apply Filter</p>
                  </div>
               </SelectBankSource>
            </div>
         </div>
         <div className="mb-4">
            <TableComponent table_data={tableData} />
         </div>
      </div>
   );
}

export default TransactionHistrory;
