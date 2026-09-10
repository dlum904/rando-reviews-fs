import type { Review, Comment, User } from '../types/review.tsx';
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

type ReviewModalProps = {
	review: Review | null,
	setSelectedReview: (review: Review | null) => void
	user: User | undefined
}

const ReviewModal = ({ review, setSelectedReview, user }: ReviewModalProps) => {

	type CommentFormData = {
		author: string;
		text: string;
	}

	// Default comment form data is an empty comment
	const defaultCommentFormData: CommentFormData = {
		author: user?.username || '',
		text: ''
	};

	const [comments, setComments] = useState<Comment[]>(review?.comments || []);
	const [commentFormData, setCommentFormData] = useState<CommentFormData>(defaultCommentFormData);

	/**
	 * Handle comment change
	 * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The event object
	 */
	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCommentFormData({ ...commentFormData, text: e.target.value });
		console.log('commentFormData', commentFormData);
	}

	/**
	 * Add a comment to the review
	 * @param {React.FormEvent<HTMLFormElement>} e - The event object
	 */
	const addComment = async (e: React.FormEvent<HTMLFormElement>) => {
		
		console.log('addComment called');

		e.preventDefault();

		try {

			const response = await fetch(`${API_URL}/comments/add/${review?.id}`, {
				method: 'POST',
				body: JSON.stringify(commentFormData),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			if (!response.ok) {
				
				throw new Error('Failed to add comment');

			} else {

				const data = await response.json();
				if (data.success) {
					setComments([...comments, data.comment]);
					setCommentFormData(defaultCommentFormData);
				} else {
					console.error('Error adding comment:', data.message);
				}
				
			}

		} catch (error) {

			console.error('Error adding comment:', error);

		}
	}

	return review ? (

		<div className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">

				<article className="bg-slate-900 p-6 rounded-xl w-1/2 max-lg:w-11/12 max-h-[80vh] border border-slate-700 ring-1 ring-blue-500/30 shadow-2xl shadow-black/60 z-10 flex flex-col overflow-hidden">

					<div className="flex justify-between items-center gap-2 shrink-0">

						<div className="flex gap-3 items-center">
							<p className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">{review.category}</p>
							<p className="text-xs text-slate-500">{review.date}</p>
						</div>

						<button
							className="rounded-md px-2 py-0.5 text-slate-400 transition-colors cursor-pointer hover:bg-blue-600 hover:text-white"
							aria-label="Close review"
							onClick={() => setSelectedReview(null)}
						>
							x
						</button>

					</div>

					<h2 className="shrink-0 mt-3 text-left">{review.title}</h2>

					<div className="overflow-y-auto min-h-0 flex-1 pr-1">

						<div className="flex flex-col gap-3 border-t border-slate-800 pt-4 text-left min-h-75">

							<p className="flex items-center gap-1.5 text-sm text-blue-400">
							{[1, 2, 3, 4, 5].map((value: number) => (
								<FaStar key={value} className={`h-3 w-3 ${value <= review.rating ? "fill-blue-500" : "fill-slate-400"}`} />
							))}
				<span className="text-slate-300">{review.rating} Stars</span>
							</p>

							<p className="leading-relaxed text-slate-300">{review.text}</p>
							<p className="text-sm text-slate-500">- {review.author}</p>

						</div>

						<div className="border-t border-slate-800 pt-4">

							<h2 className="text-left !text-lg">Comments</h2>

							<div className="flex flex-col gap-2 text-left">

								<ul className="flex flex-col gap-3">
									{comments.map((comment) => {
										return (
											<li key={comment.id} className="flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
												<p className="text-sm leading-relaxed text-slate-300">{comment.text}</p>
												<div className="flex gap-2 items-center text-xs text-slate-500">
													<p>- {comment.author}</p>
													<span className="text-slate-700">|</span>
													<p>{comment.date}</p>
												</div>

											</li>
										)
									})}
								</ul>

								<form onSubmit={addComment} className="flex flex-col gap-2">
									<textarea className="rounded-lg border border-slate-700 bg-slate-950/60 p-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" name="text" placeholder="Add a comment" value={commentFormData.text} onChange={handleCommentChange} rows={3} />
									<button className="mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-950/50 transition-colors cursor-pointer hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900" type="submit">Add Comment</button>
								</form>

							</div>

						</div>

					</div>

				</article>

				<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setSelectedReview(null)} />

		</div>

	) : null;
}

export default ReviewModal;