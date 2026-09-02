import express from 'express';
import { register, login, logout, getUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST a new user
router.post('/register', register);

// POST a login request
router.post('/login', login)

// POST a logout request
router.post('/logout', logout);

// Middleware to authenticate the user before accessing the routes below this middleware.
router.use(authMiddleware);

// GET a user's profile
router.get('/getUser', getUser);



export default router;