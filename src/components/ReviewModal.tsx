import type { Review, Comment } from '../types/review.tsx';
import { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaStar } from "react-icons/fa";

type ReviewModalProps = {
	review: Review | null,
	setSelectedReview: (review: Review | null) => void
}

const ReviewModal = ({ review, setSelectedReview }: ReviewModalProps) => {

	const [comments, setComments] = useState<Comment[]>(review?.comments || []);

	const handleCommentVote = (commentId: string, vote: 'up' | 'down') => {

		
		const currentComment = comments.find(comment => comment.id === commentId);

		if (currentComment) {

			if (vote === 'up') {
				// If the comment has upVotes, increment it, otherwise set it to 0
				currentComment.upVotes ? currentComment.upVotes++ : 0;
			} else {
				// If the comment has downVotes, increment it, otherwise set it to 0
				currentComment.downVotes ? currentComment.downVotes++ : 0;
			}

			console.log(currentComment);

			// Update the comments state with the new comment
			setComments(comments.map(comment => comment.id === commentId ? currentComment : comment));
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

					<h2 className="shrink-0 mt-3 text-left">{review.subject}</h2>

					<div className="overflow-y-auto min-h-0 flex-1 pr-1">

						<div className="flex flex-col gap-3 border-t border-slate-800 pt-4 text-left min-h-75">

							{/* TODO: Add a star rating component */}
							<p className="flex items-center gap-1.5 text-sm text-blue-400">
								<FaStar className="h-3.5 w-3.5" />
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
												<div className="flex gap-3">

													<button className="flex items-center justify-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 transition-colors cursor-pointer hover:border-blue-500 hover:bg-blue-600 hover:text-white"
														onClick={() => handleCommentVote(comment.id, 'up')}
													>
														<FaThumbsUp className="h-3 w-3" />
														<span>{comment.upVotes || 0}</span>
													</button>

													<button className="flex items-center justify-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 transition-colors cursor-pointer hover:border-slate-500 hover:bg-slate-700 hover:text-white"
														onClick={() => handleCommentVote(comment.id, 'down')}
													>
														<FaThumbsDown className="h-3 w-3" />
														<span>{comment.downVotes || 0}</span>
													</button>

												</div>
											</li>
										)
									})}
								</ul>

							</div>

						</div>

					</div>

				</article>

				<div className="fixed top-0 left-0 w-full h-full z-0" onClick={() => setSelectedReview(null)} />

		</div>

	) : null;
}

export default ReviewModal;