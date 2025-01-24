import React, { ReactNode } from "react";

function DashboardHeadline({
   children,
   para,
}: {
   children: ReactNode;
   para: string;
}) {
   return (
      <div className=" flex flex-col gap-1 mt-4">
         <h1 className=" font-bold text-3xl">{children}</h1>
         <p className=" text-gray-500">{para}</p>
      </div>
   );
}

export default DashboardHeadline;
