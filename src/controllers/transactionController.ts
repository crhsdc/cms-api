import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'; // Add this import for generating unique IDs

export const getAllTransactions = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get all transactions' });
};

export const getTransactionById = (req: Request, res: Response) => {
    const { id } = req.params;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ message: `Get transaction by ID: ${id}` });
};

export const createTransaction = (req: Request, res: Response) => {
    const { body } = req;
    const { amount } = req.body;

    // Validation logic
    if (!body || Object.keys(body).length === 0 || !amount) {
        return res.status(400).json({ error: 'Invalid transaction data' });
    }

    const transaction = body;

    res.status(201).json({ message: 'Transaction created', transaction });
};

export const updateTransaction = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Transaction not found' });
    }

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ error: 'Invalid transaction data' });
    }

    res.status(200).json({ message: `Transaction updated`, transaction: { id, ...body } });
};

export const deleteTransaction = (req: Request, res: Response) => {
    const { id } = req.params;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json({ id: id, message: `Transaction deleted` });
};
