import express from 'express';
// import { register, login, logout } from '../controllers/authController.js';
const router = express.Router();

// POST a new user
// router.post('/register', register);
router.post('/register', (req, res) => {
	res.json({ message: 'Register a new user', data: req.body });
});

// POST a login request
// router.post('/login', login)
router.post('/login', (req, res) => {
	res.json({ message: 'Login a user', data: req.body });
});

// POST a logout request
// router.post('/logout', logout);
router.post('/logout', (req, res) => {
	res.json({ message: 'Logout a user' });
});

export default router;