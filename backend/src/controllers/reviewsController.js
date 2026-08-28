;import { prisma } from '../config/db.js';
import reviewSchema from '../validators/reviewValidator.js';


/**
 * Gets all reviews
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const getReviews = async (req, res) => {

	console.log("reviewsController.js: getReviews called");

	try {

		const reviews = await prisma.review.findMany();
		console.log("reviewsController.js: getReviews reviews:", reviews);

		return res
			.status(200)
			.json({ message: 'Reviews fetched successfully', reviews });

	} catch (error) {

		console.error("reviewsController.js: getReviews error:", error);
		
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });

	}
};

/**
 * Gets a review by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const getReviewById = async (req, res) => {
	
	const reviewId = req.params.reviewId;

	console.log("reviewsController.js: getReviewById called:", reviewId);

	if (!reviewId) {

		return res
			.status(400)
			.json({ message: 'Review ID is required' });

	}

	try {

		const review = await prisma.review.findUnique({
			where: { id: reviewId }
		});
	
		if (!review) {
	
			return res
				.status(404)
				.json({ message: 'Review not found' });
	
		} else {
	
			return res
				.status(200)
				.json({ message: 'Review found', review });
	
		}

	} catch (error) {

		console.error("reviewsController.js: getReviewById error:", error);

		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });

	}

}

/**
 * Creates a new review
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const createReview = async (req, res) => {

	const body = req.body;

	console.log("reviewsController.js: createReview called:", body);

	const { title, text, category, rating } = body;
	const userId = req.user.id; // TODO: add user id to the request object.

	if (!title || !text || !category || !rating) {

		return res
			.status(400)
			.json({ message: 'title, text, category, and rating are required' });

	} else {

		try {

			const review = await prisma.review.create({
				data: {
					title,
					text,
					category,
					rating,
					authorId: userId,
				}
			});

			return res
				.status(201)
				.json({ message: 'Review created successfully', review });

		} catch (error) {

			console.error("reviewsController.js: createReview error:", error);

			return res
				.status(500)
				.json({ message: 'Internal server error', error: error.message });

		}

	}
};

/**
 * Deletes a review
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const deleteReview = async (req, res) => {

	const reviewId = req.params.reviewId;

	console.log("reviewsController.js: deleteReview called:", reviewId);

	if (!reviewId) {
		return res
			.status(400)
			.json({ message: 'Review ID is required' });
	}

	try {

		const review = await prisma.review.findUnique({
			where: { id: reviewId }
		});
	
		if (!review) {
			return res
				.status(404)
				.json({ message: 'Review not found' });
		}

		const deleteReview = await prisma.review.delete({
			where: { id: reviewId }
		});

		return res
			.status(200)
			.json({ message: 'Review deleted successfully', deleteReview });


	} catch (error) {
		
		console.error("reviewsController.js: deleteReview error:", error);
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });
	}
	
};

export { getReviews, getReviewById, createReview, deleteReview };