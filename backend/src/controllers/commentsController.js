;import { prisma } from '../config/db.js';
import commentSchema from '../validators/commentValidator.js';
import { commentInclude, serializeComment } from '../utils/serializers.js';


/**
 * Gets all comments
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const getComments = async (req, res) => {

	console.log("commentsController.js: getComments called");

	try {

		const comments = await prisma.comment.findMany({
			orderBy: { createdAt: 'asc' },
			include: commentInclude
		});
		console.log("commentsController.js: getComments comments:", comments);

		return res
			.status(200)
			.json({ message: 'Comments fetched successfully', comments: comments.map(serializeComment) });

	} catch (error) {

		console.error("commentsController.js: getComments error:", error);
		
		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });

	}
};

/**
 * Gets a comment by id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const getCommentById = async (req, res) => {
	
	const commentId = req.params.commentId;	

	console.log("commentsController.js: getCommentById called:", commentId);

	if (!commentId) {

		return res
			.status(400)
			.json({ message: 'Comment ID is required' });

	}

	try {

		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
			include: commentInclude
		});
	
		if (!comment) {
	
			return res
				.status(404)
				.json({ message: 'Comment not found' });
	
		} else {
	
			return res
				.status(200)
				.json({ message: 'Comment found', comment: serializeComment(comment) });
	
		}

	} catch (error) {

		console.error("commentsController.js: getCommentById error:", error);

		return res
			.status(500)
			.json({ message: 'Internal server error', error: error.message });

	}

}

/**
 * Creates a new comment
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const createComment = async (req, res) => {

	const body = req.body;

	console.log("commentsController.js: createComment called:", body);

	const { text, reviewId } = body;
	const userId = req.user.id; // TODO: add user id to the request object.

	if (!text || !reviewId) {

		return res
			.status(400)
			.json({ message: 'text and reviewId are required' });

	} else {

		try {

			const comment = await prisma.comment.create({
				data: {
					text,
					reviewId,
					authorId: userId,
				},
				include: commentInclude
			});

			return res
				.status(201)
				.json({ message: 'Comment created successfully', comment: serializeComment(comment) });

		} catch (error) {

			console.error("commentsController.js: createComment error:", error);

			return res
				.status(500)
				.json({ message: 'Internal server error', error: error.message });

		}

	}
};


export { getComments, getCommentById, createComment };