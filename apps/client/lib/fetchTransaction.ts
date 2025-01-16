import { toast } from "react-toastify";
import getTransaction from "../app/lib/support/getTransaction";
import { TransactionType } from "@repo/interface/interface";

export const fuctionTxs = async (
   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setTableData: React.Dispatch<React.SetStateAction<TransactionType[]>>
) => {
   setLoading(true);
   const toastId = toast.loading("Please wait...");
   console.log("hellow ");
   const txs = await getTransaction();
   console.log(txs);
   if (txs.success && txs.transactions) {
      setTableData(txs.transactions);
      toast.update(toastId, {
         render: "Transaction History",
         type: "success",
         isLoading: false,
         autoClose: 6000,
      });
   }
   setLoading(false);
};
