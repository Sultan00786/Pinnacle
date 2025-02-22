"use server";
import { prisma } from "@repo/db/client";

export async function isUserPresent(email: string) {
   try {
      const user = await prisma.user.findFirst({
         where: {
            email: email,
         },
      });

      if (user?.id) {
         return {
            success: true,
            message: "User is Present",
         };
      }
      return {
         success: false,
         message: "User is not Present. Please Sign-up",
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
