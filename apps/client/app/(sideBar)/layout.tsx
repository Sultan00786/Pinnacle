"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ReactNode } from "react";
import SideBar from "../../components/SideBar";

const tabs = [
   {
      label: "Home",
      icon: "",
   },
   {
      label: "My Bank",
      icon: "",
   },
   {
      label: "Transaction History",
      icon: "",
   },
   {
      label: "Payment Transfer",
      icon: "",
   },
   {
      label: "Connect Bank",
      icon: "",
   },
];

// export default function SideBar({children}: {children: ReactNode}) {

export default function SideBarLayout({ children }: { children: ReactNode }) {
   return (
      <div className="flex w-screen">
         <SideBar />
         <div className="w-full">{children}</div>
      </div>
   );
}
