"use client";
import { Modal, ModalContent, User } from "@nextui-org/react";
import { UserType } from "@repo/interface/interface";
import { Button as Button2 } from "@repo/ui/component";
import {
   History,
   HomeIcon,
   Link2,
   LogOut,
   Search,
   SendHorizontal,
   Wallet2,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getUserDetails from "../app/lib/support/getUserDetails";
import Logo from "./Logo";

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
   const session = useSession();
   const pathname = usePathname();
   const router = useRouter();
   const [isModal, setIsModal] = useState(false);
   const [user, setUser] = useState<UserType>({} as UserType);

   if (!session?.data?.user) {
      router.push("/login");
      return;
   }

   // useEffect(() => {
   //    if (!session?.data?.user) {
   //       router.push("/login");
   //       return;
   //    }
   // }, [session, router]);

   useEffect(() => {
      async function func() {
         const res = await getUserDetails();
         console.log(res);
         if (res.user) {
            setUser(res.user);
         }
      }
      func();
   }, []);

   return (
      <div className="relative flex h-screen w-60 flex-col bg-card left-0 top-0 border-r ">
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
                  {navigation.map((item, index) => {
                     const isActive = pathname === item.href;
                     return (
                        <div
                           key={index}
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
               <User
                  name={user.firstName}
                  description={
                     user?.email?.length > 15
                        ? user.email.slice(0, 15) + "..."
                        : user.email
                  }
               />
               <button className="p-2 hover:bg-purple-400 hover:text-white rounded-md text-muted-foreground hover:text-foreground transition-colors">
                  <LogOut
                     className="h-5 w-5"
                     onClick={() => setIsModal(true)}
                  />
               </button>
            </div>
         </div>
         <Modal isOpen={isModal} size="sm" onClose={() => setIsModal(false)}>
            <ModalContent>
               <div className="p-4">
                  <h1 className="text-2xl font text-purple-800 font-bold">
                     Sure, you to LogOut ??
                  </h1>
                  <div>
                     <div className="flex justify-end gap-2 mt-4">
                        <Button2 onClick={() => signOut()}>Yes</Button2>
                        <Button2
                           variant="Secondary"
                           onClick={() => setIsModal(false)}
                        >
                           no
                        </Button2>
                     </div>
                  </div>
               </div>
            </ModalContent>
         </Modal>
      </div>
   );
}

export default SideBar;
