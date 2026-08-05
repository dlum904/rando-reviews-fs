/**
 * SearchBar component
 * Displays a search bar for searching reviews
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (query: string) => void }) => {

	return (
		<div>
			<input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
		</div>
	)
}

export default SearchBar;