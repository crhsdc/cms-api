import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Get all users' });
};

export const getUserById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: `Get user by ID: ${id}` });
};

export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Invalid user data' });
    }

    res.status(201).json({ message: 'User created', user: req.body });
};

export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Invalid user data' });
    }

    res.status(200).json({
        message: 'User updated',
        user: { id, name, email },
    });
};

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted', id: id });
};
