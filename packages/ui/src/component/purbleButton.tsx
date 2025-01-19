"use client";
import React, { MouseEventHandler, ReactNode } from "react";
import { Button } from "@nextui-org/react";

function PurbleButton({
   children,
   onClick = () => {},
}: {
   children: ReactNode;
   onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
   return (
      <div>
         <Button
            className="text-black bg-transparent border shadow border-gray-300 hover:text-white hover:bg-purple-600"
            onClick={onClick}
         >
            {children}
         </Button>
      </div>
   );
}

export default PurbleButton;
