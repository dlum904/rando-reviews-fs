import express from 'express';

const router = express.Router();

// GET all comments for a review
router.get('/:reviewId', (req, res) => {
	res.json({ message: 'List of comments for review with id of ' + req.params.reviewId });
});

// GET a comment by id
router.get('/:reviewId/:commentId', (req, res) => {
	res.json({ message: 'Comment with id of ' + req.params.reviewId + ' and ' + req.params.commentId });
});

// POST a new comment
router.post('/add/:reviewId', (req, res) => {
	res.json({ message: 'Create a new comment' });
});

// PUT an existing comment
router.put('/update/:reviewId/:commentId', (req, res) => {
		res.json({ message: 'Update the comment with id of ' + req.params.reviewId + ' and ' + req.params.commentId });
});

// DELETE an existing comment
router.delete('/delete/:reviewId/:commentId', (req, res) => {
	res.json({ message: 'Delete the comment with id of ' + req.params.reviewId + ' and ' + req.params.commentId });
});

export default router;