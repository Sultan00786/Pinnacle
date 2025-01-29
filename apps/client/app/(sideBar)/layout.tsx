"use client";
import { ReactNode } from "react";
import SideBar from "../../components/SideBar";

export default function SideBarLayout({ children }: { children: ReactNode }) {
   return (
      <div className="flex">
         <SideBar />
         <div className=" pl-[255px] w-full overflow-hidden">{children}</div>
      </div>
   );
}
