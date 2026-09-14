/**
 * Log to the console only in development
 * @param args - The values to log
 */
const devLog = (...args: unknown[]): void => {
	if (import.meta.env.DEV) {
		console.log(...args);
	}
};

export { devLog };
