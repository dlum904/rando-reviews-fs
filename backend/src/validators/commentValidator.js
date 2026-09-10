import { z } from 'zod';

const commentSchema = z.object({
	text: z.string().min(1).max(1000).trim(),
});

export default commentSchema;
