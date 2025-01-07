import {
   AddCardInputProps,
   SignUpIputProps,
} from "@repo/interface/interface";
import { createAccount } from "../app/lib/action/createAccount";
import { getSession, signIn } from "next-auth/react";
import { getServerSession, Session } from "next-auth";
import { authOption } from "./nextAuth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

export async function nextAuthSignUp(
   account: AddCardInputProps | null
) {
   if (!account) throw new Error("Account is null");
   const token = (await getSession()) as CustomSession;
   if (token?.user?.id) {
      const createAccountRes = await createAccount({
         userId: Number(token?.user?.id),
         cardHolder: account.cardHolder,
         cardNumber: account.cardNumber,
         cvv: account.cvv,
         month: account.month,
         year: account.year,
         phone: account.phone,
      });
      return {
         status: true,
      };
   }
   return {
      status: false,
   };
}
