import { AddCardInputProps } from "@repo/interface/interface";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { createAccount } from "../app/lib/action/createAccount";

interface CustomUser {
   id: string;
   name?: string | null;
   email?: string | null;
   image?: string | null;
}

// Define a custom type for the session token
interface CustomSession extends Session {
   user?: CustomUser;
   // other properties
}

export async function nextAuthSignUp(account: AddCardInputProps | null) {
   if (!account) {
      throw new Error("Account data is required");
   }
   const { cardHolder, cardNumber, cvv, source, month, year, phone } = account;
   if (
      !cardHolder ||
      !cardNumber ||
      !cvv ||
      !source ||
      !month ||
      !year ||
      !phone
   ) {
      throw new Error("Incomplete account data");
   }

   const token = (await getSession()) as CustomSession;
   if (token?.user?.id) {
      const createAccountRes = await createAccount({
         userId: Number(token?.user?.id),
         cardHolder: account.cardHolder,
         cardNumber: account.cardNumber,
         cvv: account.cvv,
         source: account.source,
         month: account.month,
         year: account.year,
         phone: account.phone,
      });

      if (!createAccountRes.success) {
         return {
            status: false,
            message: createAccountRes.message,
         };
      }

      return {
         status: true,
      };
   }
   return {
      status: false,
   };
}
