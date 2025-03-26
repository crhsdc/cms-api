export interface Invoice {
    id: string;
    transactionId: string;
    amount: number;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
