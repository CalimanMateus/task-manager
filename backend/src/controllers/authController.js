const authService = require('../services/authService');

/**
 * Auth Controller
 * Handles HTTP requests for authentication
 */

/**
 * Register a new user
 * POST /auth/register
 * @param {Object} req - Request object with body { name, email, password }
 * @param {Object} res - Response object
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Call auth service
    const result = await authService.registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    // Handle specific errors
    if (error.statusCode === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Login user
 * POST /auth/login
 * @param {Object} req - Request object with body { email, password }
 * @param {Object} res - Response object
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Call auth service
    const result = await authService.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    // Handle authentication errors
    if (error.statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  register,
  login,
};
