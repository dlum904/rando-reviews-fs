const CategoryBar = () => {
	return (
		<div className="border-2 border-red-500 p-4 flex flex-row justify-left items-baseline" >
			<ul className="flex flex-row justify-left gap-4 items-center">
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">All</li>
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">Food</li>
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">Drink</li>
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">Service</li>
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">Ambience</li>
				<li className="border-2 border-blue-500 rounded-md px-2 py-.5 cursor-pointer hover:bg-blue-500 hover:text-white">Value</li>
			</ul>
		</div>
	)
}

export default CategoryBar;