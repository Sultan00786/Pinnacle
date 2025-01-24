import { prisma } from "@repo/db/client";
import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
const app = express();

type PaymentInfo = {
   token: string;
   userId: string;
   accountNo: string;
   amount: number;
};

dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
   res.send("This is Bank webhook server");
});

app.post("/bankwebhook", async (req, res) => {
   // amount is multiple of 100
   const { token, userId, accountNo, amount } = req.body;

   if (!token || !userId || !accountNo || !amount) {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "All fields are required !!",
         });
      });
   }

   const transaction = await prisma.onRampTransaction.findFirst({
      where: {
         token: token,
      },
   });

   if (!transaction?.id) {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "Transaction not found !!",
         });
      });
   }

   if (transaction?.status !== "Processing") {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "Payment already Processesed !!",
         });
      });
   }

   if (
      transaction?.amount !== amount ||
      transaction?.receiveAcc !== accountNo ||
      transaction?.userId !== userId
   ) {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "Invalid Transaction request !!",
         });
      });
   }

   const user = await prisma.user.findFirst({
      where: {
         id: Number(userId),
      },
      select: {
         id: true,
         totalBalance: true,
         accounts: true,
      },
   });

   if (!user?.id) {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "User not found !!",
         });
      });
   }

   const totalBalance = user?.accounts.reduce(
      (acc, current) => acc + current.balance,
      0
   );

   const account = await prisma.account.findFirst({
      where: {
         accountNo: accountNo,
         userId: Number(userId),
      },
   });

   if (!account?.id) {
      return Promise.resolve().then(() => {
         res.json({
            success: false,
            message: "Account not found !!",
         });
      });
   }

   try {
      console.log(totalBalance);
      const transactionResult = await prisma.$transaction([
         // update balance amt or increate amt
         prisma.account.update({
            where: {
               accountNo: accountNo,
            },
            data: {
               balance: {
                  increment: Number(amount),
               },
            },
         }),

         // update user balance
         prisma.user.update({
            where: {
               id: Number(userId),
            },
            data: {
               totalBalance: {
                  increment: Number(amount + totalBalance),
               },
            },
         }),

         //  and also update transciption status
         prisma.onRampTransaction.update({
            where: {
               token: token,
            },
            data: {
               status: "Success",
            },
         }),
      ]);

      return Promise.resolve().then(() => {
         res.json({
            message: "Payment Captured !!",
         });
      });
   } catch (error) {
      console.log(error);
      res.status(411).json({
         message: "Error while processing webhook",
      });
   }
});

app.listen(process.env.PORT, () => {
   console.log(" Bank webhook server is running on port: ", process.env.PORT);
});
