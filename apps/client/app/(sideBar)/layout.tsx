"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import { ReactNode, useEffect } from "react";
import SideBar from "../../components/SideBar";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

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
   const session = useSession();
   const router = useRouter();
   const path = usePathname();

   // if (session?.data?.user) {
   //    router.push(`${path}`);
   // } else {
   //    router.push("/login");
   // }
   return (
      <div className="flex w-screen">
         <SideBar />
         <div className="relative w-full overflow-hidden">{children}</div>
      </div>
   );
}
