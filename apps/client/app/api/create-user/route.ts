// pages/api/create-user.ts
import { prisma } from "@repo/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      return NextResponse.json({
         message: "User created successfully",
      });
   } catch (error: any) {
      console.error(
         "Error during user creation:",
         error.message
      );
      console.error("Stack Trace:", error.stack);
      return NextResponse.json({
         error: "Internal Server Error",
      });
   }
}
