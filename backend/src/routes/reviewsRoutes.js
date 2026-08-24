import express from 'express';

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
router.post('/add', (req, res) => {
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