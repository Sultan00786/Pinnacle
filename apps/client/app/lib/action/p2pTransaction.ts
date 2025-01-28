"use server";
import { Prisma, prisma, PrismaClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOption } from "../../../lib/nextAuth";

// enum CategoryP2P {
//    Income,
//    Deposit,
//    Subscirptions,
//    Food,
//    Groceries,
// }

export interface P2Ptype {
   email: string;
   source: string;
   toAccountNumber: string;
   amount: number;
}

export default async function p2pTransaction({
   email,
   toAccountNumber,
   amount,
   source,
}: P2Ptype) {
   try {
      // Validate required input fields

      console.log(email, toAccountNumber, amount, source);

      if (!email || !toAccountNumber || !amount || !source) {
         return {
            success: false,
            error: "Please provide all the details",
            message: "Transaction fail !!",
         };
      }

      // Retrieve user session and validate login status
      const session = await getServerSession(authOption);
      if (!session?.user?.id) {
         return {
            success: false,
            error: "Please Login",
            message: "Transaction fail !!",
         };
      }

      // Extract and validate sender's user ID
      const fromUserId = Number(session?.user?.id);
      if (isNaN(fromUserId)) {
         return {
            success: false,
            error: "Please Login",
            message: "Transaction fail !!",
         };
      }

      // Fetch sender's user details, including total balance and accounts
      const fromUser = await prisma.user.findFirst({
         where: { id: fromUserId },
         select: { id: true, totalBalance: true, accounts: true },
      });
      if (!fromUser) {
         return {
            success: false,
            error: "Login User not found",
            message: "Transaction fail !!",
         };
      }

      // Check if sender has sufficient total balance
      if (fromUser.totalBalance < amount) {
         return {
            success: false,
            error: "Insufficient Balance",
            message: "Transaction fail !!",
         };
      }

      // Fetch recipient user details
      const toUser = await prisma.user.findFirst({
         where: { email: email },
      });
      if (!toUser?.id) {
         return {
            success: false,
            error: "Recipient user not found",
            message: "Transaction fail !!",
         };
      }

      // Validate recipient's account details
      const toUserAccount = await prisma.account.findFirst({
         where: { accountNo: toAccountNumber, userId: toUser.id },
      });
      if (!toUserAccount) {
         return {
            success: false,
            error: "Recipient Account not found",
            message: "Transaction fail !!",
         };
      }

      // Verify the recipient account source matches
      if (toUserAccount?.source !== source) {
         return {
            success: false,
            error: "Provide Recipient Account source",
            message: "Transaction fail !!",
         };
      }

      // Begin database transaction for atomic updates
      await prisma.$transaction(async (txs: Prisma.TransactionClient) => {
         // Deduct the amount from multiple sender accounts
         let remainingAmount = amount;
         let i = 0;

         // Check if the sender has any accounts
         if (!fromUser.accounts || fromUser.accounts.length === 0) {
            throw new Error("No accounts available for this user.");
         }

         // Loop through sender accounts to deduct the amount
         while (remainingAmount > 0 && i < fromUser.accounts.length) {
            console.log(remainingAmount);
            const account = fromUser.accounts[i];
            if (!account) {
               throw new Error("Account not found.");
            }

            // Lock the account for update to avoid race conditions
            await txs.$queryRaw`SELECT * FROM "Account" WHERE "id" = ${account.id} FOR UPDATE`;

            // Deduct balance or set account balance to zero
            if (account.balance >= remainingAmount) {
               await txs.account.update({
                  where: { id: account.id },
                  data: { balance: { decrement: remainingAmount } },
               });
               break;
            } else {
               await txs.account.update({
                  where: { id: account.id },
                  data: { balance: 0 },
               });
               remainingAmount -= account.balance;
               i++;
            }
         }

         console.log(
            "hellow >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
         );

         // Lock recipient's account for update
         await txs.$queryRaw`SELECT * FROM "Account" WHERE "id" = ${toUserAccount.id} FOR UPDATE`;

         // Increment recipient's account balance
         await txs.account.updateMany({
            where: { accountNo: toUserAccount.accountNo },
            data: { balance: { increment: amount } },
         });

         // Update sender's total balance
         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${fromUser.id} FOR UPDATE`;
         const formUserRes = await txs.user.update({
            where: { id: fromUser.id },
            data: { totalBalance: { decrement: amount } },
         });

         if (!formUserRes) {
            throw new Error("From Account update failed.");
         }

         // Update recipient's total balance
         await txs.$queryRaw`SELECT * FROM "User" WHERE "id" = ${toUser.id} FOR UPDATE`;
         const toUserres = await txs.user.update({
            where: { id: toUser.id },
            data: { totalBalance: { increment: Number(amount) } },
         });

         if (!toUserres) {
            throw new Error("To Account update failed.");
         }

         // Create a transaction record
         const randomNum = Math.floor(Math.random() * 3) + 1;
         const transactionRes = await txs.transaction.create({
            data: {
               amount: amount,
               from: fromUser.id,
               to: toUser.id,
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
            throw new Error("Transaction record creation failed.");
         }
      });

      // Return success response
      return {
         success: true,
         message: "Transaction Successful 🎇✨",
      };
   } catch (error) {
      console.log(error); // Log error for debugging
      return {
         success: false,
         message: "Transaction fails !!",
         error: `${error}`, // Include error details in response
      };
   }
}
