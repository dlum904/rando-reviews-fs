	/**
	 * Validate username
	 * @param username - The username to validate
	 * @returns results object with isValid and errorMessage
	 */
const validateUsername = (username: string): { isValid: boolean, errorMessage: string } => {

	const results = {
		isValid: true,
		errorMessage: ''
	}
	// Check if username is between 3 and 20 characters long
	if (username.length < 3 || username.length > 20) {
		results.isValid = false;
		results.errorMessage = 'Username must be between 3 and 20 characters long';
	}
	// Check if username contains only letters and numbers
	const usernameRegex = /^[a-zA-Z0-9]+$/;
	if (!usernameRegex.test(username)) {
		results.isValid = false;
		results.errorMessage = 'Username must contain only letters and numbers';
	}

	return results;

}

/**
 * Validate password
 * @param password - The password to validate
 * @returns results object with isValid and errorMessage
 */
const validatePassword = (password: string): { isValid: boolean, errorMessage: string } => {
	const results = {
		isValid: true,
		errorMessage: ''
	}
	// Check if password is between 8 and 20 characters long
	if (password.length < 8 || password.length > 20) {
		results.isValid = false;
		results.errorMessage = 'Password must be between 8 and 20 characters long';
	}

	// Check if password contains at least one lowercase letter, one uppercase letter, one number, and one special character
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	if (!passwordRegex.test(password)) {
		results.isValid = false;
		results.errorMessage = 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character';
	}

	return results;

};

export { validateUsername, validatePassword };