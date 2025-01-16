"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/transaction/TableComponent";
import getTransaction from "../../lib/support/getTransaction";
import { toast } from "react-toastify";
import { TransactionType } from "@repo/interface/interface";
import { Loader } from "@repo/ui/component";
import { fuctionTxs } from "../../../lib/fetchTransaction";

function TransactionHistrory() {
   const [loading, setLoading] = useState(false);
   const [tableData, setTableData] = useState<TransactionType[]>(
      [] as TransactionType[]
   );

   // const fuctionTxs = async () => {
   //    setLoading(true);
   //    const toastId = toast.loading("Please wait...");
   //    console.log("hellow ");
   //    const txs = await getTransaction();
   //    console.log(txs);
   //    if (txs.success && txs.transactions) {
   //       setTableData(txs.transactions);
   //       toast.update(toastId, {
   //          render: "Transaction History",
   //          type: "success",
   //          isLoading: false,
   //          autoClose: 6000,
   //       });
   //    }
   //    setLoading(false);
   // };

   useEffect(() => {
      fuctionTxs(setLoading, setTableData);
   }, []);

   if (loading) {
      return (
         <div>
            <Loader />
         </div>
      );
   }

   return (
      <div>
         <TableComponent table_data={tableData} />
      </div>
   );
}

export default TransactionHistrory;
