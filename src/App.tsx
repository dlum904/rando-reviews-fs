import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import type { Review } from './types/review.tsx';
import { seedReviews } from './data/seedReviews.ts';
import SearchBar from './components/SearchBar.tsx';
import CategoryBar from './components/CategoryBar.tsx';
import ReviewFeed from './components/ReviewFeed.tsx';
import ReviewModal from './components/ReviewModal.tsx';
import ReviewForm from './components/ReviewForm.tsx';
import './App.css'

const App = () => {

  // State for reviews
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewFormToggle, setReviewFormToggle] = useState<boolean>(false);
  
  // const filteredReviews = reviews.filter((review) => review.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // Filter reviews based on search query and selected category
  // useMemo so we only re-filter when the reviews, selected category, or search query changes
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => review.subject.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === 'All' || review.category === selectedCategory));
  }, [reviews, selectedCategory, searchQuery]);

  console.log(filteredReviews);
  console.log(selectedReview);


  return (

    <div className="flex flex-col min-h-svh bg-slate-950 text-slate-300">

      < Header setReviewFormToggle={setReviewFormToggle} />

      {/* < Hero /> */}
      <main className="flex-1">

        {/* Only render the review modal if a review is selected */}
        {selectedReview && < ReviewModal key={selectedReview.id} review={selectedReview} setSelectedReview={setSelectedReview} />}
        < ReviewForm reviews={reviews} setReviews={setReviews} reviewFormToggle={reviewFormToggle} setReviewFormToggle={setReviewFormToggle} />
        < CategoryBar selectedCategory={selectedCategory} setSelectedCategory= {setSelectedCategory} />
        < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        < ReviewFeed reviews={filteredReviews} setSelectedReview={setSelectedReview} />

      </main>
      


      < Footer />
    </div>
  )

}

export default App
