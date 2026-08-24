import express from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
	// res.send('Hello, World!');
	res.json({ message: 'Hello, World!' });
});

app.use('/reviews', reviewsRoutes);
app.use('/comments', commentsRoutes);
app.use('/auth', authRoutes);