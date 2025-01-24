"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthComponent from "../../components/auth/AuthComponent";

function Login() {
   const router = useRouter();
   const session = useSession();
   if (session?.data?.user) {
      router.push("/dashboard");
   }
   return <AuthComponent authType="login" />;
}

export default Login;
