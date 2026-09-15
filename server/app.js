import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Everything is mounted under /api because the frontend and this app are served from the
// same domain on Vercel. The incoming path still includes the /api prefix when Vercel
// rewrites /api/* to the serverless function.
const api = express.Router();

api.get('/', (req, res) => {
	res.json({ message: 'Hello, World!' });
});

api.use('/reviews', reviewsRoutes);
api.use('/comments', commentsRoutes);
api.use('/auth', authRoutes);

app.use('/api', api);

export default app;
