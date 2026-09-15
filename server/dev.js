import "dotenv/config";
import app from "./app.js";
import { connectDB, disconnectDB } from './config/db.js';

// Local development entry point. On Vercel the app is served by api/index.js instead, so
// nothing in this file runs in production.

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejection and uncaught exception
process.on('unhandledRejection', async (error) => {
	console.error('Unhandled rejection:', error);
	disconnectDB();
	process.exit(1);
});

// Handle uncaught exception
process.on('uncaughtException', async (error) => {
	console.error('Uncaught exception:', error);
	disconnectDB();
	process.exit(1);
});

// Handle SIGINT signal
process.on('SIGINT', async () => {
	console.log('SIGINT signal received. Shutting down gracefully...');
	disconnectDB();
	process.exit(0);
});
