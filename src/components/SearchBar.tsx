import { FaSearch } from "react-icons/fa";

/**
 * SearchBar component
 * Displays a search bar for searching reviews
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => {

	return (
		<div className="px-6 py-4 flex flex-row justify-start items-baseline" >

			<div className="relative w-full">

				<FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

				<input
					className="w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-3 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
					type="text"
					placeholder="Search reviews"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

			</div>

		</div>
	)
}

export default SearchBar;
