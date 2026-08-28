import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';


/**
 * Middleware to authenticate the user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function. Tells the server to move on to the next middleware.
 * @returns {Object} - The response object
 */
const authMiddleware = async (req, res, next) => {

	console.log('authMiddleWare.js: authMiddleware called');

	let token;

	// Check if the token is in the headers and is a Bearer token
	// Example: Authorization: "Bearer <token>"
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

		token = req.headers.authorization.split(' ')[1]; // Separate the actual token from "Bearer"

	} else if(req.cookies?.jwt) {	// Check if the token is in the cookies
		
		token = req.cookies.jwt;

	}

	console.log('authMiddleWare.js: token', token);

	// If no token is found, return a 401 Unauthorized response
	if (!token) {

		return res.status(401).json({ message: 'Unauthorized' });

	} else {

		try {

			console.log(token);

			// Verify the token using the JWT_SECRET
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			console.log('authMiddleWare.js: decoded', decoded);

			// Find the user by the id in the token
			const user = await prisma.user.findUnique({
				where: { id: decoded.id}
			})

			// If the user does not exist, return a 401 Unauthorized response
			if (!user) {

				return res
					.status(401)
					.json({ message: 'User does not exists' });

			} else {

				console.log('authMiddleWare.js: user found', user);

				// Add the user to the request object. This way we can access the user in the routes.
				req.user = user;

				// Call the next middleware
				next();

			}

		} catch (err) {

			return res
				.status(400)
				.json({ error: err.message });


		}

	}

	
}

export default authMiddleware;