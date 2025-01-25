"use client";
import { ReactNode } from "react";
import SideBar from "../../components/SideBar";

export default function SideBarLayout({ children }: { children: ReactNode }) {

   return (
      <div className="flex w-screen">
         <SideBar />
         <div className="relative w-full overflow-hidden">{children}</div>
      </div>
   );
}
