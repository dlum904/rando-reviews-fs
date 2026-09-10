import type { Review, User } from '../types/review.tsx';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

// Props for the ReviewForm component
type ReviewFormProps = {
	reviews: Review[],
	setReviews: (review : Review[]) => void ,
	reviewFormToggle: boolean,
	setReviewFormToggle: (reviewFormToggle: boolean) => void,
	user: User | undefined
}

/**
 * ReviewForm component
 * @param {ReviewFormProps} reviews - The reviews array
 * @param {ReviewFormProps} setReviews - The function to set the reviews array
 * @param {ReviewFormProps} reviewFormToggle - The state of the review form toggle
 * @param {ReviewFormProps} setReviewFormToggle - The function to set the review form toggle
 * @returns {JSX.Element} - The ReviewForm component
 */
const ReviewForm = ({ reviews, setReviews, reviewFormToggle, setReviewFormToggle, user } : ReviewFormProps) => {

	type ReviewFormData = {

		author: string;
		title: string;
		category: string;
		rating: number;
		text: string;
		date: string;
	}

	// Default form data is an empty review
	const defaultFormData: ReviewFormData = {

		author: user?.username || '',
		title: '',
		category: '',
		rating: 0,
		text: '',
		date: ''
	};

	const [formData, setFormData] = useState<ReviewFormData>(defaultFormData);
	const [hoverRating, setHoverRating] = useState<number>(0);

	/**
	 * Handle change in the form
	 * When the user types in the form, the form data is updated
	 * @param e - The event object
	 */
	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {

		e.preventDefault();

		console.log(e.target.name, e.target.value);

		const { name, value } = e.target;

		const newReview: ReviewFormData = {
			...formData,
			[name]: value as string | number, // [name] is whatever the name of the input is.
		};
		
		setFormData(newReview);
		console.log(formData);
	};

	/**
	 * Handle rating click
	 * When the user clicks on a rating, the rating is set to the value
	 * @param value - The value of the rating
	 */
	const handleRatingClick = (value: string) => {
		console.log(value);
		const newReview: ReviewFormData = {
			...formData,
			rating: parseInt(value)
		};
		setFormData(newReview);
		console.log(formData);
	}

	/**
	 * Handle form submission
	 * When the user submits the form, the form data is submitted to the backend
	 * @param e - The event object
	 */
  const handleFormSubmit = async(e: React.FormEvent<HTMLFormElement>) => {    
		console.log(formData);
		e.preventDefault();

		const newReview: ReviewFormData = {
			...formData,
			date: new Date().toISOString()
		};


		try {

			const response = await fetch(`${API_URL}/reviews/add`, {
				method: 'POST',
				body: JSON.stringify(newReview),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				}
			});

			if (response.ok) {

				const data = await response.json();
				if (data.success) {

					setReviews([data.review as Review,...reviews]);
					setFormData(defaultFormData); // Reset the form data to the default data
					
					console.log("Form submitted");
					setReviewFormToggle(false);

				} else {

					console.error('Error submitting review:', data.message);
					
				}

			} else {

				console.error('Error submitting review:', response.statusText);

			}

		} catch (error) {

			console.error('Error submitting review:', error);

		}

	};

	const categoryOptions = ["Food", "Movies", "Places", "Services", "Other"];
	const inputClassNames = "rounded-lg border border-slate-700 bg-slate-950/60 p-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40";
	const buttonClassNames = "mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-950/50 transition-colors cursor-pointer hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

	// Only show the review form if the review form is toggled on.
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

					<span className="pl-2 text-sm text-slate-400 text-left">Signed in as:  {defaultFormData.author}</span> 
					<input className={inputClassNames} name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} />
					
					<select className={inputClassNames} name="category" onChange={handleChange} >
						<option value="Select a category" defaultValue="Select a category" >Select a category</option>
						{categoryOptions.map((option) => (
							<option key={option} value={option.toUpperCase()}>{option}</option>
						))}
					</select>

					<div className="flex items-center space-x-1" onMouseLeave={() => setHoverRating(0)}>

						{[1, 2, 3, 4, 5].map((value: number) => {

							// Preview the hovered rating, falling back to the selected rating
							const activeRating = hoverRating || formData.rating;
							const starClass = value <= activeRating ? "fill-blue-500" : "fill-slate-400";
							
							return (
								<svg 
									key={value} 
									className={`w-5 h-5 cursor-pointer transition-colors ${starClass}`} 
									onMouseEnter={() => setHoverRating(value)} 
									onClick={() => handleRatingClick(value.toString())} 
									aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
								</svg>
							)
						})}
					
					</div>

					<input className={inputClassNames} name="text" type="text" placeholder="Text" value={formData.text} onChange={handleChange} />

					<button
						className={buttonClassNames}
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