import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB, disconnectDB } from './config/db.js';
import reviewsRoutes from "./routes/reviewsRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

await connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:3000',
	credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/', (req, res) => {
	// res.send('Hello, World!');
	res.json({ message: 'Hello, World!' });
});

app.use('/reviews', reviewsRoutes);
app.use('/comments', commentsRoutes);
app.use('/auth', authRoutes);