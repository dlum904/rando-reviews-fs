import type { Review } from '../types/review.tsx';
import ReviewCard from './ReviewCard.tsx';

/**
 * ReviewFeed component
 * @param {Review[]} reviews - The array of review objects
 * @returns {JSX.Element} - The ReviewFeed component
 */
const ReviewFeed = ({ reviews, setSelectedReview }: { reviews: Review[], setSelectedReview: (review: Review) => void }) => {
  return (
    <div className="text-left flex flex-col">

      <div className="px-6 text-sm font-medium uppercase tracking-wider text-slate-500">
        <span className="text-blue-400">{reviews.length}</span> reviews
      </div>

      <div className=
        "p-6 gap-5 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
        >
        { reviews.map((review) => {
          return (
            <ReviewCard key={review.id} review={review} setSelectedReview={setSelectedReview} />
          )
        })}
      </div>

      { reviews.length === 0 && (
        <p className="px-6 pb-10 text-center text-slate-500">No reviews match your search.</p>
      )}

    </div>
  )
}

export default ReviewFeed
