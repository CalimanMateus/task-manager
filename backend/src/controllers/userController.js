const userService = require('../services/userService');

/**
 * User Controller
 * Handles HTTP requests for user operations
 */

/**
 * Get user profile
 * GET /users/profile
 * @param {Object} req - Request object with user data from JWT
 * @param {Object} res - Response object
 */
const getProfile = async (req, res) => {
  try {
    // User ID is attached to request by auth middleware
    const userId = req.user.id;

    const user = await userService.getUserProfile(userId);

    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    // Handle not found errors
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getProfile,
};
