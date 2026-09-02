import{ prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

/**
 * Gets a user's profile
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const getUser = async (req, res) => {

	console.log('authController.js: getUser called', req.user);

	const user = await prisma.user.findUnique({
		where: { id: req.user.id },
	});

	if (!user) {

		return res.status(404).json({ message: 'User not found' });

	} else {

		return res.status(200).json({ user: { id: user.id, username: user.username } });

	}
}

/**
 * Registers a new user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const register = async (req, res) => {

	const body = req.body;
	console.log("authController.js: register called:", body);

	const { username, password } = body;

	// Check if the username, and password are provided
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: 'username, and password are required' })
	}

	// Check if the user already exists
	const userExists = await prisma.user.findUnique({
		where: { username: username },
	});
	
	// If the user already exists, return an error
	if (userExists) {
		
		return res
			.status(400)
			.json({ message: 'User already exists with this username' });

	} else {

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		
		// Create a new user in the database using the Prisma client
		const user = await prisma.user.create(
			{
				data: {
					username,
					password: hashedPassword
				}
			}
		);

		// If the user is created successfully, return a success response
		if (user) {

			console.log('Username created');
			// Generate a JWT token for the user and set it as a cookie in the response
			const token = generateToken(user.id, res);

			return res
				.status(201)
				.json(
					{ 
						status: "success",
						data: {
							user: { id: user.id, username: user.username },
							token
						}
					}
				);

		} else {
			// If the user is not created successfully, return an error response
			return res
				.status(400)
				.json(
					{ 
						status: "error",
						message: 'Failed to create user' 
					}
				);
		}
	}
}

/**
 * Logs in a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const login = async (req, res) => {

	const body = req.body;
	console.log("authController.js: login called:", body);

	const { username, password } = body;

	// Check if the user already exists
	const user = await prisma.user.findUnique({
		where: { username: username },
	});

	if (!user) {
		
		// Return an unauthorized response
		return res
			.status(401)
			.json({ message: 'Invalid username or password' })

	} else {

		// Compare the submitted password with the hashed password in user object
		const passwordValid = await bcrypt.compare(password, user.password);

		if (!passwordValid) {

			// Return an unauthorized response
			return res
				.status(401)
				.json({ message: 'Invalid username or password' })

		} else {
			
			// Generate a JWT token for the user and set it as a cookie in the response
			const token = generateToken(user.id, res);

			// Return a success response with the user data and token
			return res
				.status(201)
				.json(
					{ 
						status: "success",
						data: {
							user: { id: user.id, username: user.username },
							token
						}
					}
				);
	
		}
		
	}

}

/**
 * Logs out a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} - The response object
 */
const logout = async (req, res) => {

	// Set the JWT cookie to an empty string and expire it immediately
	res.cookie("jwt", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: "strict",
		expires: new Date(0)
	});

	// Return a success response
	return res
		.status(200)
		.json(
			{ 
				status: "success",
				message: "Logged out successfully"
			}
		);
}

export { getUser, register, login, logout };