/**
 * SearchBar component
 * Displays a search bar for searching reviews
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => {

	return (
		<div className="border-2 border-red-500 p-4 flex flex-row justify-left items-baseline" >
			<input className="border-2 border-blue-500 p-2 w-full" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
		</div>
	)
}

export default SearchBar;