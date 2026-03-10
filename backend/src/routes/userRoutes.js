const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * User Routes
 */

// GET /users/profile - Get authenticated user profile (protected route)
router.get('/profile', authenticateToken, userController.getProfile);

module.exports = router;
