"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../../../lib/nextAuth";
import { prisma } from "@repo/db/client";

export default async function getUserDetails() {
   try {
      const session = await getServerSession(authOption);
      if (!session?.user?.id)
         return {
            success: false,
            message: "User is not Login",
         };
      const userId = Number(session?.user?.id);

      const user = await prisma.user.findFirst({
         where: {
            id: userId,
         },
         select: {
            accounts: true,
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            address: true,
            state: true,
            totalBalance: true,
            dateOfBirth: true,
            createdAt: true,
         },
      });
      if (!user) {
         return {
            success: false,
            message: "User not found",
         };
      }

      return {
         success: true,
         user: user,
         message: "User found successfuly !!",
      };
   } catch (error) {
      console.log(error);
      return {
         success: false,
         error: `${error}`,
         message: "Something went wrong",
      };
   }
}
