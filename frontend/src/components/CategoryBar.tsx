/**
 * CategoryBar component
 * Displays a list of categories for filtering reviews
 * @returns {JSX.Element} CategoryBar component
 */
const CategoryBar = ({ selectedCategory, setSelectedCategory } : { selectedCategory: string, setSelectedCategory: (category: string) => void } ) => {

	const categoryClassNames = "rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm text-slate-300 transition-colors cursor-pointer hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300";
	const selectedCategoryClassNames = "rounded-full border border-blue-500 bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow-md shadow-blue-950/50 transition-colors cursor-pointer hover:bg-blue-500";

	// TODO: Get categories from the database
	const categories = ["All", "Food", "Movies", "Places", "Services", "Products", "Other"];

	return (
		<div className="px-6 pt-6 flex flex-row justify-start items-baseline" >
			<ul className="flex flex-row flex-wrap justify-start gap-2 items-center">
				{categories.map((category: string) => (
					<li
						key={category}
						className={
							category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase() ? selectedCategoryClassNames : categoryClassNames
						}
						onClick={() => setSelectedCategory(category.toUpperCase())}>{category}
					</li>
				))}
			</ul>
		</div>
	);
}

export default CategoryBar;
