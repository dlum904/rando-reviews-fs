import type { Review } from '../types/review.tsx';
import { useState } from 'react';


type ReviewFormProps = {
	reviews: Review[],
	setReviews: (review : Review[]) => void ,
	reviewFormToggle: boolean,
	setReviewFormToggle: (reviewFormToggle: boolean) => void
}

const ReviewForm = ({ reviews, setReviews, reviewFormToggle, setReviewFormToggle } : ReviewFormProps) => {

	// Default form data is an empty review
	const defaultFormData: Review = {
		id: '',
		author: '',
		subject: '',
		category: '',
		rating: 0,
		text: '',
		date: ''
	};

	const [formData, setFormData] = useState<Review>(defaultFormData);

	const inputClassNames = "rounded-lg border border-slate-700 bg-slate-950/60 p-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

	/**
	 * Handle change in the form
	 * When the user types in the form, the form data is updated
	 * @param e - The event object
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		e.preventDefault();

		console.log(e.target.name, e.target.value);

		const { name, value } = e.target;
		const date = new Date().toISOString();

		const newReview: Review = {
			...formData,
			[name]: value as string | number, // [name] is whatever the name of the input is.
			date: date
		};
		
		setFormData(newReview);
		console.log(formData);
	};

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {    
		console.log(formData);
		e.preventDefault();

		setFormData(defaultFormData); // Reset the form data to the default data
		console.log("Form submitted");

	};

	return reviewFormToggle ? (

		<div className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">

			<article className="p-6 rounded-xl w-1/2 max-lg:w-11/12 bg-slate-900 border border-slate-700 ring-1 ring-blue-500/30 shadow-2xl shadow-black/60 z-10">

				<div className="flex justify-between items-center gap-2 mb-4">
					<h2 className="!mb-0 text-left">Write a <span className="text-blue-400">Review</span></h2>
					<button
						className="rounded-md px-2 py-0.5 text-slate-400 transition-colors cursor-pointer hover:bg-blue-600 hover:text-white"
						aria-label="Close form"
						type="button"
						onClick={() => setReviewFormToggle(false)}
					>
						x
					</button>
				</div>

				<form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>

					<input className={inputClassNames} name="id" type="text" placeholder="ID" value={formData.id} onChange={handleChange} />
					<input className={inputClassNames} name="author" type="text" placeholder="Author" value={formData.author} onChange={handleChange} />
					<input className={inputClassNames} name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} />
					<input className={inputClassNames} name="category" type="text" placeholder="Category" value={formData.category} onChange={handleChange} />
					<input className={inputClassNames} name="rating" type="text" placeholder="Rating" value={formData.rating} onChange={handleChange} />
					<input className={inputClassNames} name="text" type="text" placeholder="Text" value={formData.text} onChange={handleChange} />

					<button
						className="mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-950/50 transition-colors cursor-pointer hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
						type="submit"
					>
						Submit
					</button>

				</form>

			</article>

		<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setReviewFormToggle(false)} />

</div>

	) : null;
}

export default ReviewForm