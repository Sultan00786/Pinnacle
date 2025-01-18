import {
   PrismaClient,
   TransactionCategory,
   TransactionStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

export { prisma, TransactionCategory, TransactionStatus };
