"use server";

import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOption } from "../../../lib/nextAuth";

export async function creatOnRampTransaction(
   amount: number,
   accountNo: number,
   provider: string
) {
   if (!accountNo || !provider || !amount) {
      return {
         success: false,
         message: "All fields are required",
      };
   }

   const session = await getServerSession(authOption);
   const userId = session?.user?.id;

   if (!userId) {
      return {
         success: false,
         message: "Unauthorized",
      };
   }

   const token = Math.random();

   try {
      const result = await prisma.onRampTransaction.create({
         data: {
            status: "Processing",
            token: token.toString(),
            provider: provider,
            amount: amount * 100,
            startTime: new Date(),
            userId: Number(userId),
            receiveAcc: accountNo.toString(),
         },
      });
   } catch (error: any) {
      if (error) console.log(error);
      return {
         success: false,
         message: "Internal Server Error",
         error: error,
      };
   }

   return {
      success: true,
      message: "OnRamp Transacion successfully created !",
   };
}
