import { FaUserCircle } from "react-icons/fa";

const Header = ({ setReviewFormToggle }: { setReviewFormToggle: (reviewFormToggle: boolean) => void }) => {
  return (
    <header>
      <div className="flex flex-row justify-between items-center">
        <h1>Rando Reviews</h1>
        <div className="flex flex-row justify-between items-center gap-4">
          <button className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 cursor-pointer" onClick={() => setReviewFormToggle(true)} >Write a Review</button>
          <FaUserCircle className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </header>
  )
}

export default Header