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
            success: false,
            message: "User is Present",
         };
      }
      return {
         success: true,
         message: "User is not Present",
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
