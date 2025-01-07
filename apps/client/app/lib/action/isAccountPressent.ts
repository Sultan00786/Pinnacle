"use server";

import { prisma } from "@repo/db/client";

export const isAccountPressent = async (accountNo: string) => {
   try {
      const account = await prisma.account.findFirst({
         where: {
            accountNo: accountNo,
         },
      });

      if (account?.id) {
         return {
            success: true,
            message: "Account is Present",
            data: account,
         };
      }

      return {
         success: false,
         message: "Account is not Present",
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         message: "Something went wrong",
         error: error,
      };
   }
};
