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

		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

			<article className="p-4 rounded-md w-1/2 h-1/2 border-2 border-blue-500 z-10">
			
				<form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>

					<input className="p-2 rounded-md border-2 border-gray-300" name="id" type="text" placeholder="ID" value={formData.id} onChange={handleChange} />
					<input className="p-2 rounded-md border-2 border-gray-300" name="author" type="text" placeholder="Author" value={formData.author} onChange={handleChange} />
					<input className="p-2 rounded-md border-2 border-gray-300" name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange} />
					<input className="p-2 rounded-md border-2 border-gray-300" name="category" type="text" placeholder="Category" value={formData.category} onChange={handleChange} />
					<input className="p-2 rounded-md border-2 border-gray-300" name="rating" type="text" placeholder="Rating" value={formData.rating} onChange={handleChange} />
					<input className="p-2 rounded-md border-2 border-gray-300" name="text" type="text" placeholder="Text" value={formData.text} onChange={handleChange} />
				
					<button className="p-2 rounded-md bg-blue-500 text-white" type="submit">Submit</button>
				
				</form>

			</article>

		<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setReviewFormToggle(false)} />

</div>

	) : null;
}

export default ReviewForm