"use client";

import path from "path";
import AuthComponent from "../../components/auth/AuthComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Signup() {
   const router = useRouter();
   const session = useSession();
   console.log(session);
   if (session?.data?.user) {
      router.push("/dashboard");
   }
   return (
      <div>
         <AuthComponent authType={"signup"} />
      </div>
   );
}
