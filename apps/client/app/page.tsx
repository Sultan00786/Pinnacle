"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
   const session = useSession();
   const router = useRouter();

   if (!session?.data?.user) {
      router.push("/signup");
   } else {
      router.push("/dashboard");
   }
}
