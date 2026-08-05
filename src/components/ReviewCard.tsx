import type { Review } from '../types/review.tsx';

/**
 * ReviewCard component
 * @param {Review} review - The review object
 * @returns {JSX.Element} - The ReviewCard component
 */
const ReviewCard = ({ review }: { review: Review }) => {
	return (
		<article className="border-2 border-blue-500 cursor-pointer rounded-lg p-5">
			<h2>{review.subject}</h2>
			<p>{review.text}</p>
		</article>
	)
}

export default ReviewCard