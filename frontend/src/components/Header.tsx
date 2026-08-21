import { FaUserCircle } from "react-icons/fa";

type HeaderUser = {
  email?: string | null;
  name?: string | null;
};

const Header = ({
  setReviewFormToggle,
  user,
  onOpenAuth,
  onSignOut,
}: {
  setReviewFormToggle: (reviewFormToggle: boolean) => void;
  user: HeaderUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex flex-row justify-between items-center gap-4 px-6 py-3">

        <h1 className="!my-0 !text-3xl !tracking-tight max-md:!text-2xl">
          Rando <span className="text-blue-400">Reviews</span>
        </h1>

        <div className="flex flex-row justify-between items-center gap-4">

          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/50 transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
            onClick={() => setReviewFormToggle(true)}
          >
            Write a Review
          </button>

          {user ? (
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400 cursor-pointer"
              onClick={onSignOut}
              title="Sign out"
            >
              <FaUserCircle className="w-7 h-7" />
              <span className="max-md:hidden">{user.email ?? user.name ?? "Account"}</span>
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400 cursor-pointer"
              onClick={onOpenAuth}
              title="Sign in"
            >
              <FaUserCircle className="w-7 h-7 text-slate-500" />
              <span className="max-md:hidden">Sign in</span>
            </button>
          )}

        </div>

      </div>
    </header>
  )
}

export default Header
