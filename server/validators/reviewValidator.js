import { z } from 'zod';

/**
 * Review schema
 * @type {z.ZodObject<{title: z.ZodString, text: z.ZodString, category: z.ZodEnum<["FOOD", "MOVIES", "PLACES", "SERVICES", "OTHER"]>, rating: z.ZodNumber}>}
 */
const reviewSchema = z.object({
	title: z.string().min(1).max(100).trim(),
	text: z.string().min(1).max(1000).trim(),
	category: z.enum(["FOOD", "MOVIES", "PLACES", "SERVICES", "OTHER"]),
	rating: z.number().min(1).max(5).int(),
});

export default reviewSchema;