import { TransactionCategory, TransactionStatus } from "@repo/db/client";

export interface TransactionType {
   id: number;
   amount: number;
   date: Date;
   status: TransactionStatus;
   category: TransactionCategory;
   reciever: { firstName: string; lastName: string };
}
