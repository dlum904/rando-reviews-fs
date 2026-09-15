import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import reviewSchema from '../validators/reviewValidator.js';
import { getReviews, getReviewById, createReview, deleteReview } from '../controllers/reviewsController.js';

const router = express.Router();

// GET all reviews
router.get('/', getReviews);

// GET a review by id
router.get('/:reviewId', getReviewById);

// Middleware to authenticate the user before accessing the routes below this middleware.
router.use(authMiddleware);

// POST a new review
// Validate the request body against the zod schema specified in reviewValidator.js
router.post('/add', validateRequest(reviewSchema), createReview);

// // PUT an existing review TODO
// router.put('/update/:reviewId', (req, res) => {
// 	res.json({ message: 'Update the review with id of ' + req.params.reviewId });
// });

// DELETE an existing review
router.delete('/delete/:reviewId', (req, res) => {
	res.json({ message: 'Delete the review with id of ' + req.params.reviewId });
});

export default router;