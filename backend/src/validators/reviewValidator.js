import { z } from 'zod';

const reviewSchema = z.object({
	rating: z.number().min(1).max(5).int(),
	title: z.string().min(1).max(100).trim(),
	text: z.string().min(1).max(1000).trim(),
	category: z.enum(
		["FOOD", "MOVIES", "PLACES", "SERVICES", "OTHER"]
	)
});

export default reviewSchema;

// export const validateReview = (data) => {
// 	return reviewSchema.safeParse(data);
// };