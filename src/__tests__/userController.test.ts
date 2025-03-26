import { Request, Response } from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/userController';

describe('User Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getAllUsers', () => {
        it('should return a list of users', () => {
            getAllUsers(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Get all users' });
        });
    });

    describe('getUserById', () => {
        it('should return user by ID if found', () => {
            req.params = { id: '123' };

            getUserById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: `Get user by ID: ${req.params.id}` });
        });

        it('should return 404 if user is not found', () => {
            req.params = { id: '' };

            getUserById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });

    describe('createUser', () => {
        it('should create a new user and return it', () => {
            req.body = { name: 'John Doe', email: 'john@example.com' };

            createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User created',
                user: { name: 'John Doe', email: 'john@example.com' },
            });
        });

        it('should return 400 if required fields are missing', () => {
            req.body = { name: '' };

            createUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid user data' });
        });
    });

    describe('updateUser', () => {
        it('should update user by ID and return it', () => {
            req.params = { id: '123' };
            req.body = { name: 'Jane Doe', email: 'jane@example.com' };

            updateUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User updated',
                user: { id: '123', name: 'Jane Doe', email: 'jane@example.com' },
            });
        });

        it('should return 404 if user to update is not found', () => {
            req.params = { id: '' };
            req.body = { name: 'Jane Doe', email: 'jane@example.com' };

            updateUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });

    describe('deleteUser', () => {
        it('should delete user by ID and return a success message', () => {
            req.params = { id: '123' };

            deleteUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User deleted', id: '123' });
        });

        it('should return 404 if user to delete is not found', () => {
            req.params = { id: '' };

            deleteUser(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });
});
