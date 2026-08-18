import { FaStar } from 'react-icons/fa';
import type { Review } from '../types/review.tsx';

/**
 * ReviewCard component
 * @param {Review} review - The review object
 * @returns {JSX.Element} - The ReviewCard component
 */
const ReviewCard = ({ review, setSelectedReview }: { review: Review, setSelectedReview: (review: Review) => void }) => {

	return (
		<article
			className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/30 transition-colors cursor-pointer hover:border-blue-500 hover:bg-slate-900"
			onClick={() => setSelectedReview(review)}
		>

			<div className="flex justify-between items-center gap-2">
				<p className="rounded-full border border-blue-500/40 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">{review.category}</p>
				<p className="text-xs text-slate-500">{review.date}</p>
			</div>

			<h2 className="!mb-0 transition-colors group-hover:text-blue-300">{review.subject}</h2>

			{/* TODO: Add a star rating component */}
			<p className="flex items-center gap-1.5 text-sm text-blue-400">
				<FaStar className="h-3.5 w-3.5" />
				<span className="text-slate-300">{review.rating} Stars</span>
			</p>

			<p className="text-sm leading-relaxed text-slate-400">{review.text}</p>

			<p className="mt-auto pt-2 text-sm text-slate-500">- {review.author}</p>

		</article>
	)
}

export default ReviewCard
