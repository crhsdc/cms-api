import { Request, Response } from 'express';
import {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from '../controllers/transactionController';

describe('Transaction Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getAllTransactions', () => {
        it('should return a list of transactions', () => {
            getAllTransactions(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Get all transactions' });
        });
    });

    describe('getTransactionById', () => {
        it('should return transaction by ID if found', () => {
            req.params = { id: '123' };

            getTransactionById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: `Get transaction by ID: ${req.params.id}` });
        });

        it('should return 404 if transaction is not found', () => {
            req.params = { id: '' };

            getTransactionById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
        });
    });

    describe('createTransaction', () => {
        it('should create a new transaction and return it', () => {
            req.body = { amount: 500, type: 'credit' };

            createTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Transaction created',
                transaction: { amount: 500, type: 'credit' },
            });
        });

        it('should return 400 if required fields are missing', () => {
            req.body = { amount: null };

            createTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid transaction data' });
        });
    });

    describe('updateTransaction', () => {
        it('should update transaction by ID and return it', () => {
            req.params = { id: '123' };
            req.body = { amount: 700, type: 'debit' };

            updateTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Transaction updated',
                transaction: { id: '123', amount: 700, type: 'debit' },
            });
        });

        it('should return 404 if transaction to update is not found', () => {
            req.params = { id: '' };
            req.body = { amount: 700, type: 'debit' };

            updateTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
        });
    });

    describe('deleteTransaction', () => {
        it('should delete transaction by ID and return a success message', () => {
            req.params = { id: '123' };

            deleteTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Transaction deleted', id: '123' });
        });

        it('should return 404 if transaction to delete is not found', () => {
            req.params = { id: '' };

            deleteTransaction(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
        });
    });
});
