import type { Review } from '../types/review.tsx';

const ReviewModal = ({ review, setSelectedReview }: { review: Review | null, setSelectedReview: (review: Review | null) => void }) => {
	return review ? (

		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

				<article className="bg-gray-500 p-4 rounded-md w-1/2 h-1/2 border-2 border-blue-500 z-10">

					<div className="flex justify-between">

						<div className="flex gap-2 items-center">
							<p className="border-2 border-blue-500 rounded-md px-1 bg-blue-500 text-white">{review.category}</p>
							<p>{review.date}</p>
						</div>

						<button className="rounded-md px-1 cursor-pointer text-white hover:bg-blue-500 hover:text-white" onClick={() => setSelectedReview(null)}>x</button>

					</div>

					<h2>{review.subject}</h2>

					<div className="flex flex-col gap-2 border-t-2 border-red-500 text-left">

						<p>{review.rating} Stars</p> {/* TODO: Add a star rating component */}
						<p>{review.text}</p>
						<p>- {review.author}</p>

					</div>

					<div className="border-t-2 border-red-500">
						<h2>Comments</h2>
						<div className="flex flex-col gap-2 text-left">
							<p>Comment 1</p>
							<p>Comment 2</p>
							<p>Comment 3</p>
						</div>
					</div>

				</article>

				<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setSelectedReview(null)} />

		</div>

	) : null;
}

export default ReviewModal;