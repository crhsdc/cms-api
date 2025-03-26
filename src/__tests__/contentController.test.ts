import { Request, Response } from 'express';
import {
    getAllContent,
    getContentById,
    createContent,
    updateContent,
    deleteContent,
} from '../controllers/contentController';

describe('Content Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getAllContent', () => {
        it('should return a list of content', () => {
            getAllContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Get all content' });
        });
    });

    describe('getContentById', () => {
        it('should return content by ID if found', () => {
            req.params = { id: '123' };

            getContentById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: `Get content by ID: ${req.params.id}` });
        });

        it('should return 404 if content is not found', () => {
            req.params = { id: '' };

            getContentById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Content not found' });
        });
    });

    describe('createContent', () => {
        it('should create new content and return it', () => {
            req.body = { title: 'New Content', body: 'This is the body of the content' };

            createContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Content created',
                content: { title: 'New Content', body: 'This is the body of the content' },
            });
        });

        it('should return 400 if required fields are missing', () => {
            req.body = { title: '' };

            createContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid content data' });
        });
    });

    describe('updateContent', () => {
        it('should update content by ID and return it', () => {
            req.params = { id: '123' };
            req.body = { title: 'Updated Content', body: 'Updated body' };

            updateContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Content updated',
                content: { id: '123', title: 'Updated Content', body: 'Updated body' },
            });
        });

        it('should return 404 if content to update is not found', () => {
            req.params = { id: '' };
            req.body = { title: 'Updated Content', body: 'Updated body' };

            updateContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Content not found' });
        });
    });

    describe('deleteContent', () => {
        it('should delete content by ID and return a success message', () => {
            req.params = { id: '123' };

            deleteContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Content deleted', id: '123' });
        });

        it('should return 404 if content to delete is not found', () => {
            req.params = { id: '' };

            deleteContent(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Content not found' });
        });
    });
});