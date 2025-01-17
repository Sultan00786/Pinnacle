import { toast } from "react-toastify";
import getTransaction from "../app/lib/support/getTransaction";
import { TransactionType } from "@repo/interface/interface";

export const fuctionTxs = async (
   setLoading: React.Dispatch<React.SetStateAction<boolean>>,
   setTableData: React.Dispatch<React.SetStateAction<TransactionType[]>>
) => {
   setLoading(true);
   const toastId = "loading";
   toast.loading("Fetching Transaction History", {
      toastId: toastId,
   });
   // if(!toast.isActive) {
   //    toast.loading("Fetching Transaction History", {
   //       toastId: toastId,
   //    });
   // }
   console.log("hellow ");
   const txs = await getTransaction();
   console.log(txs);
   if (txs.success && txs.transactions) {
      setTableData(txs.transactions);
      toast.update(toastId, {
         render: "Transaction History",
         type: "success",
         isLoading: false,
         autoClose: 3000,
      });
   } else {
      toast.update(toastId, {
         render: txs.message,
         type: "error",
         isLoading: false,
         autoClose: 2000,
      });
   }
   setLoading(false);
};
