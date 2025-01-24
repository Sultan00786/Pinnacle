"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthComponent from "../../components/auth/AuthComponent";

export default function Signup() {
   const router = useRouter();
   const session = useSession();
   if (session?.data?.user) {
      router.push("/dashboard");
   }
   return (
      <div>
         <AuthComponent authType={"signup"} />
      </div>
   );
}
