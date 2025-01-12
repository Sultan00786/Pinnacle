"use client";
import React, { ReactNode } from "react";
import { Button } from "@nextui-org/react";

function PurbleButton({ children }: { children: ReactNode }) {
   return (
      <div>
         <Button className="text-black bg-transparent border shadow border-gray-300 hover:text-white hover:bg-purple-600">
            {children}
         </Button>
      </div>
   );
}

export default PurbleButton;
