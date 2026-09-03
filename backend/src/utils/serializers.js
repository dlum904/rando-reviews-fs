// Relations a review query needs so the response can expose author names.
const reviewInclude = {
	author: { select: { username: true } },
	comments: {
		orderBy: { createdAt: 'asc' },
		include: { author: { select: { username: true } } },
	},
};

// Relations a comment query needs so the response can expose author names.
const commentInclude = {
	author: { select: { username: true } },
};

/**
 * Flattens a comment row into the shape the frontend expects
 * @param {Object} comment - A comment row with its author relation included
 * @returns {Object} - The serialized comment
 */
const serializeComment = ({ author, createdAt, updatedAt, authorId, ...comment }) => ({
	...comment,
	author: author.username,
	date: createdAt.toISOString().slice(0, 10),
});

/**
 * Flattens a review row into the shape the frontend expects
 * @param {Object} review - A review row with its author and comments relations included
 * @returns {Object} - The serialized review
 */
const serializeReview = ({ author, comments, createdAt, updatedAt, authorId, ...review }) => ({
	...review,
	author: author.username,
	date: createdAt.toISOString().slice(0, 10),
	comments: comments ? comments.map(serializeComment) : [],
});

export { reviewInclude, commentInclude, serializeReview, serializeComment };
