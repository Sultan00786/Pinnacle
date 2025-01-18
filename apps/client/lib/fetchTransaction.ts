import { toast } from "react-toastify";
import getTransaction from "../app/lib/support/getTransaction";
import { TransactionType } from "@repo/interface/interface";
import { TransactionCategory } from "@repo/db/client";

export const fuctionTxs = async (
   setTableData: React.Dispatch<React.SetStateAction<TransactionType[]>>,
   isFull: Boolean = false,
   filter: string = "All"
) => {
   const toastId = "transaction-fetching";
   const txs = await getTransaction(isFull);
   if (txs.success && txs.transactions && filter === "All") {
      setTableData(txs.transactions);
   } else if (txs.success && txs.transactions && filter !== "") {
      setTableData(
         txs.transactions.filter(
            (item: TransactionType) => item.category === filter
         )
      );
   } else {
      console.error(txs.error);
      toast.update(toastId, {
         render: txs.message,
         type: "error",
         isLoading: false,
         autoClose: 2000,
      });
   }
};
