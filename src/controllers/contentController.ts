import { Request, Response } from 'express';

export const getAllContent = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get all content' });
};

export const getContentById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (id === '') {
        res.status(404).json({ error: 'Content not found' });
    }
    res.status(200).json({ message: `Get content by ID: ${id}` });
};

export const createContent = (req: Request, res: Response) => {
    const { title, body } = req.body;

    // Validation logic
    if (!title || !body) {
        return res.status(400).json({ error: 'Invalid content data' });
    }

    res.status(201).json({ message: 'Content created', content: req.body });
};

export const updateContent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body } = req.body;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Content not found' });
    }

    if (!title || !body) {
        return res.status(400).json({ error: 'Invalid content data' });
    }

    res.status(200).json({
        message: 'Content updated',
        content: { id, title, body },
    });
};

export const deleteContent = (req: Request, res: Response) => {
    const { id } = req.params;

    // Validation logic
    if (!id) {
        return res.status(404).json({ error: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted', id: id });
};
