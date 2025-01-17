"use server";
import { prisma } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOption } from "../../../lib/nextAuth";

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
         return {
            success: false,
            error: "Please provide all the details",
            message: "Transaction fail !!",
         };
      }

      const session = await getServerSession(authOption);
      const fromUserId = Number(session?.user?.id);
      if (isNaN(fromUserId)) {
         return {
            success: false,
            error: "Please Login",
            message: "Transaction fail !!",
         };
      }
      if (!session?.user?.id) {
         return {
            success: false,
            error: "Please Login",
            message: "Transaction fail !!",
         };
      }

      const toUser = await prisma.user.findFirst({
         where: {
            email: email,
         },
      });

      const toUserId = toUser?.id;
      if (!toUserId) {
         return {
            success: false,
            error: "Recipient user not found",
            message: "Transaction fail !!",
         };
      }
      const toUserAccount = await prisma.account.findFirst({
         where: {
            accountNo: accountNumber,
            userId: toUserId,
         },
      });
      if (!toUserAccount) {
         return {
            success: false,
            error: "Recipient Account not found",
            message: "Transaction fail !!",
         };
      }
      if (toUserAccount?.source !== source) {
         return {
            success: false,
            error: "Provide Recipient Account source",
            message: "Transaction fail !!",
         };
      }

      const fromUser = await prisma.user.findFirst({
         where: {
            id: fromUserId,
         },
         select: {
            id: true,
            totalBalance: true,
            accounts: true,
         }
      });

      if (!fromUser) {
         return {
            success: false,
            error: "Login User not found",
            message: "Transaction fail !!",
         };
      }
      if (fromUser.totalBalance < amount) {
         return {
            success: false,
            error: "Insufficient Balance",
            message: "Transaction fail !!",
         };
      }

      await prisma.$transaction(async (txs) => {
         // reducing balance from multiple accounts of login user
         let remainingAmount = amount;
         let i = 0;

         while (remainingAmount > 0 && i < fromUser.accounts.length) {
            const account = fromUser.accounts[i];
            if (!account) {
               continue;
            }

            await txs.$queryRaw`SELECT * FROM "Account" WHERE "userId" = ${account.id} FOR UPDATE`;
            if (account.balance >= remainingAmount) {
               await txs.account.update({
                  where: { id: account.id },
                  data: {
                     balance: {
                        decrement: remainingAmount,
                     },
                  },
               });
               remainingAmount = 0;
            } else {
               await txs.account.update({
                  where: { id: account.id },
                  data: {
                     balance: 0,
                  },
               });
               remainingAmount -= account.balance;
            }
            i++;
         }

         await txs.$queryRaw`SELECT * FROM "Account" WHERE "userId" = ${toUserId} FOR UPDATE`;
         await txs.account.updateMany({
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

         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${fromUser.id} FOR UPDATE`;
         const formUserRes = await txs.user.update({
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
         if (!formUserRes) {
            return {
               success: false,
               error: "From Account not found !!",
               message: "Transaction fails !!",
            };
         }

         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${toUser.id} FOR UPDATE`;
         const toUserres = await txs.user.update({
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
         if (!toUserres) {
            return {
               success: false,
               error: "To Account not found !!",
               message: "Transaction fails !!",
            };
         }

         const randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
         const transactionRes = await txs.transaction.create({
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
               status: "Success",
            },
         });

         if (!transactionRes) {
            return {
               success: false,
               error: "Transaction not created !!",
               message: "Transaction fails !!",
            };
         }
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
