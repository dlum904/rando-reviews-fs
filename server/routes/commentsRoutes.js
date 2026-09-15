import express from 'express';
import { createComment } from '../controllers/commentsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import commentSchema from '../validators/commentValidator.js';

const router = express.Router();

// GET all comments for a review
router.get('/:reviewId', (req, res) => {
	res.json({ message: 'List of comments for review with id of ' + req.params.reviewId });
});

// GET a comment by id
router.get('/:reviewId/:commentId', (req, res) => {
	res.json({ message: 'Comment with id of ' + req.params.reviewId + ' and ' + req.params.commentId });
});

// Middleware to authenticate the user before accessing the routes below this middleware.
router.use(authMiddleware);

// POST a new comment
router.post('/add/:reviewId', validateRequest(commentSchema), createComment);

export default router;