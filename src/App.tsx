import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import type { Review } from './types/review.tsx';
import { seedReviews } from './data/seedReviews.ts';
import CategoryBar from './components/CategoryBar.tsx';
import ReviewFeed from './components/ReviewFeed.tsx';
import './App.css'

const App = () => {
 
  // State for reviews
  const [reviews, setReviews] = useState<Review[]>(seedReviews);


  return (

    <div className="flex flex-col">

      < Header />
      {/* < Hero /> */}
      <main>
        <h1>HERO SECTION</h1>
        <CategoryBar />
        < ReviewFeed reviews={reviews} />

      </main>
      


      < Footer />
    </div>
  )

}

export default App
