import "./env.js";
import express from "express";
import cors from "cors";
import { sql } from "./db.js";
import { requireAuth } from "./auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/api/health", async (req, res) => {
  try {
    const [row] = await sql`SELECT 1 AS ok`;
    res.json(row);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Failed to connect to the database." });
  }
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
