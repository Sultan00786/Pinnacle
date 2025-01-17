"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { authOption } from "../../../lib/nextAuth";
import { prisma } from "@repo/db/client";
import { TransactionType } from "@repo/interface/interface";

export default async function getTransaction(isFull: Boolean = false) {
   try {
      const session = await getServerSession(authOption);
      if (!session?.user?.id)
         return {
            success: false,
            message: "User is not Login",
         };
      const userId = Number(session?.user?.id);

      const transactions: TransactionType[] = await prisma.transaction.findMany(
         {
            where: {
               from: userId,
            },
            orderBy: { date: "desc" },
            select: {
               id: true,
               amount: true,
               date: true,
               category: true,
               status: true,
               reciever: {
                  select: {
                     firstName: true,
                     lastName: true,
                  },
               },
            },
         }
      );

      if (!transactions || transactions.length === 0)
         return {
            success: false,
            message: "No Transaction found",
         };

      return {
         success: true,
         message: "Transaction found",
         transactions: !isFull ? transactions.slice(0, 4) : transactions,
      };
   } catch (error) {
      console.error(error);
      return {
         success: false,
         error: error,
         message: "Something went wrong",
      };
   }
}
