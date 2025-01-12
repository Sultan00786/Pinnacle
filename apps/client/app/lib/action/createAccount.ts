"use server";
import { AddCardInputProps } from "@repo/interface/interface";
import { prisma } from "@repo/db/client";

type DataType = AddCardInputProps & {
   userId?: number;
};

export async function createAccount(data: DataType) {
   try {
      if (!data.userId) throw new Error("please provide user id");
      const user = await prisma.user.findUnique({
         where: {
            id: data.userId,
         },
         select: {
            id: true,
            accounts: true,
         },
      });
      if (!user?.id) throw new Error("User not found at createAccount");
      if (user.accounts.length == 6)
         throw new Error("Max Limit reached !! You already have 6 accounts.");
      const newAccount = await prisma.account.create({
         data: {
            accountHolder: data.cardHolder,
            accountNo: data.cardNumber,
            cvv: Number(data.cvv),
            expiryDate: data.month + "/20" + data.year,
            phone: data.phone,
            balance: 0,
            userId: data.userId,
         },
      });

      if (!newAccount.id) throw new Error("Account not created");

      return {
         success: true,
         message: "Account created successfully",
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Something went wrong",
         error: error,
      };
   }
}
