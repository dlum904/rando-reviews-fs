import { FaUserCircle } from "react-icons/fa";
import type { User } from '../types/review.tsx';

const Header = ({ user, setReviewFormToggle, setAuthModal }: { user: User, setReviewFormToggle: (reviewFormToggle: boolean) => void, setAuthModal: (authModal: boolean) => void }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-row justify-between items-center gap-4 px-6 py-3">

        <h1 className="!my-0 !text-3xl !tracking-tight max-md:!text-2xl">
          Rando <span className="text-blue-400">Reviews</span>
        </h1>

        <div className="flex flex-row justify-between items-center gap-4">

          {user ? (
            <>
              <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/50 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
              onClick={() => setReviewFormToggle(true)}
              >
              Write a Review
              </button>
              <FaUserCircle className="w-7 h-7 text-slate-500 transition-colors hover:text-blue-400 cursor-pointer" />
            </>
          ) : 
          <>
            <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/50 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
            onClick={() => setAuthModal(true)}
            >
            Log In
            </button>

          </>
          }


        </div>

      </div>
    </header>
  )
}

export default Header
