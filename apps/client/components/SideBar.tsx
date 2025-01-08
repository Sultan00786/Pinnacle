import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "./Logo";
import {
   HomeIcon,
   Wallet2,
   History,
   SendHorizontal,
   Link2,
   Search,
   LogOut,
} from "lucide-react";

const navigation = [
   { name: "Home", href: "/dashboard", icon: HomeIcon },
   { name: "My Bank", href: "/my-bank", icon: Wallet2 },
   {
      name: "Transaction History",
      href: "/history",
      icon: History,
   },
   {
      name: "Payment Transfer",
      href: "/transfer",
      icon: SendHorizontal,
   },
   { name: "Connect Bank", href: "/connect", icon: Link2 },
];

function SideBar() {
   const pathname = usePathname();
   const router = useRouter();
   const [navList, setNavList] = useState("");
   return (
      <div className="relative flex h-screen w-60 flex-col bg-card left-0 top-0 border-r">
         <nav className="flex-1 space-y-1 px-2 py-4">
            <div className=" flex flex-col gap-4">
               <div className="">
                  <Logo />
               </div>
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                     type="text"
                     placeholder="Search..."
                     className="w-full pl-9 pr-4 py-[9px] border-2 border-gray-400 rounded-lg"
                  />
               </div>
               <div className="flex flex-col gap-[4px]">
                  {navigation.map((item) => {
                     const isActive = pathname === item.href;
                     return (
                        <div
                           className={`group flex items-center px-4 py-[9px] rounded-md cursor-pointer
                        ${
                           isActive
                              ? " bg-purple-700/80 text-white"
                              : "text-muted-foreground hover:bg-gray-300/40 hover:text-foreground"
                        }`}
                           onClick={() => router.push(item.href)}
                        >
                           <item.icon
                              className={`
                           mr-3 h-5 w-5 flex-shrink-0
                           ${
                              isActive
                                 ? "text-primary-foreground"
                                 : "text-muted-foreground group-hover:text-foreground"
                           }
                        `}
                              aria-hidden="true"
                           />
                           {item.name}
                        </div>
                     );
                  })}
               </div>
            </div>
         </nav>
         <div className="border-t p-4">
            <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-sm font-medium">
                     John Doe
                  </span>
                  <span className="text-xs text-muted-foreground">
                     john@example.com
                  </span>
               </div>
               <button className="p-2 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                  <LogOut className="h-5 w-5" />
               </button>
            </div>
         </div>
      </div>
   );
}

export default SideBar;
