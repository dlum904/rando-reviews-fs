
/**
 * The PrismaClient class is generated based on the Prisma schema defined in the project.
 * PrismaClient is the main class used to interact with the database. It provides methods for querying and manipulating data in the database.
*/

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});	// Create a new PrismaPg adapter instance with the connection string from the environment variables.

// Create an instance of the PrismaClient class, which will be used to interact with the database.
// The log option is set to log different levels of messages based on the environment (development or production).
const prisma = new PrismaClient({
	adapter,
	log: process.env.NODE_ENV === 'development' // We get process.env.NODE_ENV from the environment variables, which is the current environment of the application.
		? ['query', 'info', 'warn', 'error'] 
		: ['error'],
});

/**
 * Connects to the database using the PrismaClient instance.
 * This function is useful for establishing a connection to the database when the application starts.
 * It logs a message indicating whether the connection was successful or if an error occurred.
 */
const connectDB = async () => {
	try {
		// Attempt to connect to the database using the PrismaClient instance.
		await prisma.$connect();
		console.log('Database connection established successfully.');
	} catch (error) {
		// If an error occurs during the connection attempt, log the error and exit the process.
		console.error('Error connecting to the database:', error);
		process.exit(1);
	}
};

/**
 * Disconnects from the database using the PrismaClient instance.
 * This function is useful for gracefully closing the database connection when the application is shutting down.
 * It logs a message indicating whether the disconnection was successful or if an error occurred.	
 */
const disconnectDB = async () => {
	try {
		// Attempt to disconnect from the database using the PrismaClient instance.
		await prisma.$disconnect();
		console.log('Database connection closed successfully.');
	} catch (error) {
		// If an error occurs during the disconnection attempt, log the error.
		console.error('Error disconnecting from the database:', error);
	}
}

export { prisma, connectDB, disconnectDB };