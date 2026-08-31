import { z } from 'zod';

const reviewSchema = z.object({
	title: z.string().min(1).max(100).trim(),
	text: z.string().min(1).max(1000).trim(),
	authorId: z.string().uuid(),
	category: z.enum(["FOOD", "MOVIES", "PLACES", "SERVICES", "OTHER"]),
	rating: z.number().min(1).max(5).int(),
});

export default reviewSchema;