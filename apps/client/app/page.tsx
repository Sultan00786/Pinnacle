"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
   console.log("hellow");
   const session = useSession();
   const router = useRouter();

   console.log(session);

   if (!session?.data?.user) {
      router.push("/login");
   } else {
      router.push("/dashboard");
   }
   return <></>;
}
