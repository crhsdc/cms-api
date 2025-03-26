import { Request, Response } from 'express';

export const getAllInvoices = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get all invoices' });
};

export const getInvoiceById = (req: Request, res: Response) => {
    const { id } = req.params;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(200).json({ message: `Get invoice by ID: ${id}` });
};

export const createInvoice = (req: Request, res: Response) => {
    const { body } = req;

    // Validation logic
    if (!body || typeof body.amount !== 'number' || !body.description || typeof body.description !== 'string') {
        return res.status(400).json({ error: 'Invalid invoice data' });
    }

    res.status(201).json({ message: 'Invoice created', invoice: body });
};

export const updateInvoice = (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Invoice not found' });
    }

    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ error: 'Invalid invoice data' });
    }

    res.status(200).json({
        message: 'Invoice updated',
        invoice: { id, ...body },
    });
};

export const deleteInvoice = (req: Request, res: Response) => {
    const { id } = req.params;

    // Validation logic
    if (!id || typeof id !== 'string' || id.trim() === '') {
        return res.status(404).json({ error: 'Invoice not found' });
    }

    res.status(200).json({ id: id, message: `Invoice deleted` });
};
