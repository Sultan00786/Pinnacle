"use client";
import React, { useEffect } from "react";
import AuthComponent from "../../components/auth/AuthComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
   const router = useRouter();
   const session = useSession();
   if (session?.data?.user) {
      router.push("/dashboard");
   }
   return <AuthComponent authType="login" />;
}

export default page;
