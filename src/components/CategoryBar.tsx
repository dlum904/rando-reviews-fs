/**
 * CategoryBar component
 * Displays a list of categories for filtering reviews
 * @returns {JSX.Element} CategoryBar component
 */
const CategoryBar = ({ selectedCategory, setSelectedCategory } : { selectedCategory: string, setSelectedCategory: (category: string) => void } ) => {

	const categoryClassNames = "border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white";
	const selectedCategoryClassNames = "border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white bg-blue-500 text-white";

	// TODO: Get categories from the database
	const categories = ["All", "Food", "Movies", "Places", "Services", "Other"];

	return (
		<div className="border-2 border-red-500 p-4 flex flex-row justify-left items-baseline" >
			<ul className="flex flex-row justify-left gap-4 items-center">
				{categories.map((category: string) => (
					<li
						key={category}
						className={
							category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() ? selectedCategoryClassNames : categoryClassNames
						}
						onClick={() => setSelectedCategory(category)}>{category}
					</li>
				))}
			</ul>
		</div>
	)
}

export default CategoryBar;