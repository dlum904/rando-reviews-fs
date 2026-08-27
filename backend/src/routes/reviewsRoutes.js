import express from 'express';
import validateRequest from '../middleware/validateRequest.js';
import reviewSchema from '../validators/reviewValidator.js';

const router = express.Router();

// GET all reviews
router.get('/', (req, res) => {
	res.json({ message: 'List of reviews' });
});

// GET a review by id
router.get('/:reviewId', (req, res) => {
	res.json({ message: 'Review with id of ' + req.params.reviewId });
});

// POST a new review
// Validate the request body against the zod schema specified in reviewValidator.js
router.post('/add', validateRequest(reviewSchema), (req, res) => {
	res.json({ message: 'Create a new review' });
});

// PUT an existing review
router.put('/update/:reviewId', (req, res) => {
	res.json({ message: 'Update the review with id of ' + req.params.reviewId });
});

// DELETE an existing review
router.delete('/delete/:reviewId', (req, res) => {
	res.json({ message: 'Delete the review with id of ' + req.params.reviewId });
});

export default router;