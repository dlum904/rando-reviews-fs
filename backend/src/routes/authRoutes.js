import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

// POST a new user
router.post('/register', register);

// POST a login request
router.post('/login', login)

// POST a logout request
router.post('/logout', logout);


export default router;