import type { Review } from '../types/review.tsx';

const ReviewModal = ({ review, setSelectedReview }: { review: Review | null, setSelectedReview: (review: Review | null) => void }) => {
	return review ? (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
				<div className="bg-gray-500 p-4 rounded-md w-1/2 h-1/2 border-2 border-blue-500 z-10">
					<h1>{review.subject}</h1>
					<p>{review.rating}</p>
					<p>{review.category}</p>
					<p>{review.author}</p>
					<p>{review.date}</p>
					<p>{review.text}</p>
				</div>
				<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setSelectedReview(null)} />
		</div>
	) : null;
}

export default ReviewModal;