import { DashboardHeadline } from "@repo/ui/component";
import React from "react";
import TransferDetails from "../../../components/transfer/TransferDetails";

function Transfer() {
   return (
      <div className=" px-6 flex flex-col gap-2">
         <DashboardHeadline para="Please provide any specific details or notes related to the payment transfer">
            Payment Transfer
         </DashboardHeadline>
         <TransferDetails />
      </div>
   );
}

export default Transfer;
