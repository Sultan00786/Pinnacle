import React from "react";
import AddCardForm from "../../../components/account/AddCardForm";

function AddBankAcc() {
   return (
      <div className="flex items-center justify-center w-full h-full">
         <div className="w-[450px]">
            <AddCardForm isBackButton={false} />
         </div>
      </div>
   );
}

export default AddBankAcc;
