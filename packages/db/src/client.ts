import {
   Prisma,
   PrismaClient,
   TransactionCategory,
   TransactionStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

export { prisma, PrismaClient, Prisma, TransactionCategory, TransactionStatus };
