import type { Review } from '../types/review.tsx';
import ReviewCard from './ReviewCard.tsx';

/**
 * ReviewFeed component
 * @param {Review[]} reviews - The array of review objects
 * @returns {JSX.Element} - The ReviewFeed component
 */
const ReviewFeed = ({ reviews, setSelectedReview }: { reviews: Review[], setSelectedReview: (review: Review) => void }) => {
  return (
    <div className="text-left flex flex-col alighn-center">
      
      <div className="border-2 border-red-500 px-4 text-2xl font-bold">
        {reviews.length} reviews
      </div>

      <div className=
        "border-2 border-red-500 p-4 gap-5 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
        >
        { reviews.map((review) => {
          return (
            <ReviewCard review={review} setSelectedReview={setSelectedReview} />
          )
        })}
      </div>

    </div>
  )
}

export default ReviewFeed