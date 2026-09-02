import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import type { Review, User } from './types/review.tsx';
// import { seedReviews } from './data/seedReviews.ts';
import AuthModal from './components/authModal.tsx';
import SearchBar from './components/SearchBar.tsx';
import CategoryBar from './components/CategoryBar.tsx';
import ReviewFeed from './components/ReviewFeed.tsx';
import ReviewModal from './components/ReviewModal.tsx';
import ReviewForm from './components/ReviewForm.tsx';
import './App.css'

const App = () => {

  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviewFormToggle, setReviewFormToggle] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<boolean>(false);

  useEffect(() => {

    const fetchUser = async () => {

      console.log('App.tsx: fetchUser called');

      try {

        const res = await fetch('http://localhost:5001/auth/getUser', {
          credentials: 'include',
        });

        if (!res.ok) {

          if (res.status === 401) {

            console.log('User is guest');
            setUser(null);

          } else {

            throw new Error('Failed to fetch user');

          }


        } else {

          if (res.status === 200) {

            const data = await res.json();
            setUser(data.user);
            console.log('User is logged in', data.user);

          } else {

            console.error('Failed to fetch user');

          } 

        }

      } catch (error) {

        console.error('Error fetching user:', error);

      }
    }

    fetchUser();

  }, []);

  useEffect(() => {

    const fetchReviews = async () => {

      console.log('App.tsx: fetchReviews called');

      try {

        const res = await fetch('http://localhost:5001/reviews');
  
        if (!res.ok) {

          throw new Error('Failed to fetch reviews');

        } else {

          if (res.status === 200) {

            const data = await res.json();
            setReviews(data.reviews);

          } else {

            throw new Error('Failed to fetch reviews');

          }

        }

      } catch (error) {

        console.error('Error fetching reviews:', error);

      }
      
    }

    fetchReviews();

  }, []);

  // Filter reviews based on search query and selected category
  // useMemo so we only re-filter when the reviews, selected category, or search query changes
  const filteredReviews = useMemo(() => {
    console.log('App.tsx: filteredReviews called');
    if (reviews) {
      console.log('App.tsx: reviews fetched', reviews);
      return reviews.filter((review) => review.title.toLowerCase().includes(searchQuery.toLowerCase()) && (selectedCategory === 'All' || review.category === selectedCategory));
    }
  }, [reviews, selectedCategory, searchQuery]);
  console.log('App.tsx: filteredReviews', filteredReviews);

  console.log(filteredReviews);

  return (

    <div className="flex flex-col min-h-svh bg-slate-950 text-slate-300">

      {authModal && < AuthModal />}

      < Header user={user} setReviewFormToggle={setReviewFormToggle} setAuthModal={setAuthModal} />

      <main className="flex-1">

        {/* Only render the review modal if a review is selected */}
        {selectedReview && < ReviewModal key={selectedReview.id} review={selectedReview} setSelectedReview={setSelectedReview} />}

        {/* Only render the review form if reviews are fetched */}
        {reviews && < ReviewForm reviews={reviews} setReviews={setReviews} reviewFormToggle={reviewFormToggle} setReviewFormToggle={setReviewFormToggle} />}

        < CategoryBar selectedCategory={selectedCategory} setSelectedCategory= {setSelectedCategory} />
        < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Only render the review feed if filtered reviews are fetched */}
        {filteredReviews && < ReviewFeed reviews={filteredReviews} setSelectedReview={setSelectedReview} />}

      </main>
      


      < Footer />
    </div>
  )

}

export default App
