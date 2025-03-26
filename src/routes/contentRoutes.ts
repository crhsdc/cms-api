import { Router } from 'express';
import { getAllContent, getContentById, createContent, updateContent, deleteContent } from '../controllers/contentController';

const router = Router();

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Retrieve all content
 *     tags:
 *       - Content
 *     responses:
 *       200:
 *         description: A list of content
 */
router.get('/', getAllContent);

/**
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Retrieve content by ID
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The content ID
 *     responses:
 *       200:
 *         description: Content data
 *       404:
 *         description: Content not found
 */
router.get('/:id', getContentById);

/**
 * @swagger
 * /content:
 *   post:
 *     summary: Create new content
 *     tags:
 *       - Content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content created
 */
router.post('/', createContent);

/**
 * @swagger
 * /content/{id}:
 *   put:
 *     summary: Update content by ID
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The content ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated
 *       404:
 *         description: Content not found
 */
router.put('/:id', updateContent);

/**
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Delete content by ID
 *     tags:
 *       - Content
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The content ID
 *     responses:
 *       200:
 *         description: Content deleted
 *       404:
 *         description: Content not found
 */
router.delete('/:id', deleteContent);

export default router;
