import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user and sets it as a cookie in the response
 * @param {string} userId - The ID of the user to generate a token for
 * @param {Response} res - The response object to set the cookie in
 * @returns {string} The generated token
 */
const generateToken = (userId, res) => {

	const payload = {id: userId};

	// Sign the payload with the JWT secret and the expiration time
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d"
	});

	if (res) {
		// Set the token as a cookie in the response
		res.cookie("jwt", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
		});
	}

	return token;

}

export default generateToken;