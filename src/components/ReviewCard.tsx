import type { Review } from '../types/review.tsx';

/**
 * ReviewCard component
 * @param {Review} review - The review object
 * @returns {JSX.Element} - The ReviewCard component
 */
const ReviewCard = ({ review, setSelectedReview }: { review: Review, setSelectedReview: (review: Review) => void }) => {

	return (
		<article className="border-2 border-blue-500 cursor-pointer rounded-lg p-5" onClick={() => setSelectedReview(review)}>
			<div className="flex justify-between">
				<p className="border-2 border-blue-500 rounded-md px-1 cursor-pointer hover:bg-blue-500 hover:text-white">{review.category}</p>
				<p>{review.date}</p>
			</div>
			<h2>{review.subject}</h2>
			<p>{review.rating} Stars</p> {/* TODO: Add a star rating component */}
			<p>{review.text}</p>
			<p>- {review.author}</p>
		</article>
	)
}

export default ReviewCard