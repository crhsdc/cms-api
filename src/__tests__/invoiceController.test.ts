import { Request, Response } from 'express';
import {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
} from '../controllers/invoiceController';

describe('Invoice Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getAllInvoices', () => {
        it('should return a list of invoices', () => {
            getAllInvoices(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Get all invoices' });
        });
    });

    describe('getInvoiceById', () => {
        it('should return invoice by ID if found', () => {
            req.params = { id: '123' };

            getInvoiceById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: `Get invoice by ID: ${req.params.id}` });
        });

        it('should return 404 if invoice is not found', () => {
            req.params = { id: '' };

            getInvoiceById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invoice not found' });
        });
    });

    describe('createInvoice', () => {
        it('should create a new invoice and return it', () => {
            req.body = { amount: 100, description: 'Invoice description' };

            createInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invoice created',
                invoice: { amount: 100, description: 'Invoice description' },
            });
        });

        it('should return 400 if required fields are missing', () => {
            req.body = { amount: null };

            createInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid invoice data' });
        });
    });

    describe('updateInvoice', () => {
        it('should update invoice by ID and return it', () => {
            req.params = { id: '123' };
            req.body = { amount: 200, description: 'Updated description' };

            updateInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Invoice updated',
                invoice: { id: '123', amount: 200, description: 'Updated description' },
            });
        });

        it('should return 404 if invoice to update is not found', () => {
            req.params = { id: '' };
            req.body = { amount: 200, description: 'Updated description' };

            updateInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invoice not found' });
        });
    });

    describe('deleteInvoice', () => {
        it('should delete invoice by ID and return a success message', () => {
            req.params = { id: '123' };

            deleteInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invoice deleted', id: '123' });
        });

        it('should return 404 if invoice to delete is not found', () => {
            req.params = { id: '' };

            deleteInvoice(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invoice not found' });
        });
    });
});
