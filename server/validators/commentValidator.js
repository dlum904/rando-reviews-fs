import { z } from 'zod';

/**
 * Comment schema
 * @type {z.ZodObject<{text: z.ZodString}>}
 */
const commentSchema = z.object({
	text: z.string().min(1).max(1000).trim(),
});

export default commentSchema;
