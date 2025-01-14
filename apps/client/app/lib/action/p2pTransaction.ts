"use server";
import { getServerSession } from "next-auth";
import React from "react";
import { authOption } from "../../../lib/nextAuth";
import { prisma } from "@repo/db/client";

enum CategoryP2P {
   Income,
   Deposit,
   Subscirptions,
   Food,
   Groceries,
}

export interface P2Ptype {
   email: string;
   source: string;
   accountNumber: string;
   amount: number;
}

export default async function p2pTransaction({
   email,
   accountNumber,
   amount,
   source,
}: P2Ptype) {
   try {
      if (!email || !accountNumber || !amount || !source) {
         throw new Error("Please provide all the details");
      }

      const session = await getServerSession(authOption);
      const fromUserId = Number(session?.user?.id);
      if (isNaN(fromUserId)) {
         throw new Error("Invalid User ID");
       }
      if (!session?.user?.id) {
         throw new Error("Please Login");
      }

      console.log(
         "hellow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );

      console.log(fromUserId);

      const toUser = await prisma.user.findFirst({
         where: {
            email: email,
         },
      });

      const toUserId = toUser?.id;
      if (!toUserId) {
         throw new Error("Sender User not found");
      }
      const toUserAccount = await prisma.account.findFirst({
         where: {
            accountNo: accountNumber,
            userId: toUserId,
         },
      });
      if (!toUserAccount) {
         throw new Error("Sender Account not found");
      }
      if (toUserAccount?.source !== source) {
         throw new Error("Provide Sender Account source");
      }

      const fromUser = await prisma.user.findFirst({
         where: {
            id: fromUserId,
         },
      });

      console.log(fromUser)

      if (!fromUser) {
         throw new Error("Login User not found");
      }
      if (fromUser.totalBalance < amount) {
         throw new Error("Insufficient Balance");
      }

      const transaction = await prisma.$transaction(async (txs) => {
         await txs.$queryRaw`SELECT * FROM "Account" WHERE "userId" = ${fromUserId} FOR UPDATE`;

         await txs.account.update({
            where: {
               accountNo: accountNumber,
            },
            data: {
               balance: {
                  //  decrement: amount*100,
                  decrement: amount,
               },
            },
         });

         await txs.$queryRaw`SELECT * FROM "Account" WHERE "userId" = ${toUserId} FOR UPDATE`;

         await txs.account.update({
            where: {
               accountNo: accountNumber,
            },
            data: {
               balance: {
                  //  increment: amount*100,
                  increment: amount,
               },
            },
         });

         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${fromUserId} FOR UPDATE`;
         await txs.user.update({
            where: {
               id: fromUserId,
            },
            data: {
               totalBalance: {
                  //  decrement: amount*100,
                  decrement: amount,
               },
            },
         });

         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${toUserId} FOR UPDATE`;
         await txs.user.update({
            where: {
               id: toUserId,
            },
            data: {
               totalBalance: {
                  //  increment: amount*100,
                  increment: amount,
               },
            },
         });

         const randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
         await txs.transaction.create({
            data: {
               amount: amount,
               from: fromUser.id,
               to: toUserId,
               category:
                  randomNum === 1
                     ? "Food"
                     : randomNum === 2
                       ? "Groceries"
                       : "Subscirptions",
               status: "Processing",
            },
         });
      });

      return {
         success: true,
         message: "Transaction Successful 🎇✨",
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Transaction fails !!",
         error: error,
      };
   }
}
