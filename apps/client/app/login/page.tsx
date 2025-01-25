"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthComponent from "../../components/auth/AuthComponent";

function Login() {
   const router = useRouter();
   const { data: session } = useSession();

   useEffect(() => {
      if (session?.user) {
         router.push("/dashboard");
      }
   }, [session, router]);

   return <AuthComponent authType="login" />;
}

export default Login;
