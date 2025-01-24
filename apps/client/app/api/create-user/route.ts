// pages/api/create-user.ts
import { NextResponse } from "next/server";

export async function POST() {
   try {
      return NextResponse.json({
         message: "User created successfully",
      });
   } catch (error) {
      console.error("Error during user creation:", error);
      return NextResponse.json({
         error: "Internal Server Error",
      });
   }
}
