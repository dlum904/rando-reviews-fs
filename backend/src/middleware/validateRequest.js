/**
 * Middleware to validate the request body against the zod schema
 * @param {z.ZodSchema} schema - The zod schema to validate the request body against
 * @returns {function} - The middleware function
 */
const validateRequest = (schema) => {

	// We wrap the middle function this way to allow us to pass in the schema as a parameter
	return (req, res, next) => {

		console.log("validateRequest.js: validateRequest called:", req.body);
		console.log("validateRequest.js: schema:", schema);

		// Validate the request body against the zod schema specified in reviewValidator.js
		const result = schema.safeParse(req.body);

		console.log("validateRequest.js: result:", result);

		// If the request body is not valid, return a 400 error
		if (!result.success) {

			console.log("validateRequest.js: result.error:", result.error);

			// Get all the error messages from the zod schema
			const errorMessages = result.error.flatten().fieldErrors		// Flatten the errors and get the field errors
			console.log("validateRequest.js: errorMessages:", errorMessages);

			// The error messages will be in the format:
			// 	{
			// 		"error": {
			// 				"status": [
			// 						"Invalid option: expected one of \"FOOD\"|\"MOVIES\"|\"PLACES\"|\"SERVICES\"|\"OTHER\""
			// 				],
			// 				"rating": [
			// 						"Rating must be between 1 and 5"
			// 				]
			// 		}
			// }
			
			return res.status(400).json({ error: errorMessages }); // Return a 400 error with the error messages
		}

		// If the request body is valid, continue to the next middleware
		next();
	}

}

export default validateRequest;