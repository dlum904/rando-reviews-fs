import { z } from 'zod';

const commentSchema = z.object({
	text: z.string().min(1).max(1000).trim(),
	reviewId: z.string().uuid(),
	// authorId: z.string().uuid(),
});

export default commentSchema;
