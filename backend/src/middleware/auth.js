const jwt = require('jsonwebtoken');

/**
 * JWT Authentication Middleware
 * Validates JWT token from Authorization header
 * Attaches decoded user data to request object
 */
const authenticateToken = (req, res, next) => {
  try {
    // Extract token from Authorization header (Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Return 401 if no token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Return 403 if token is invalid or expired
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = { authenticateToken };
