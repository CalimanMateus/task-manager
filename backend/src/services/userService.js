const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * User Service
 * Handles user-related business logic
 */

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Object} User profile without password
 */
const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw {
      statusCode: 404,
      message: 'User not found',
    };
  }

  return user;
};

module.exports = {
  getUserProfile,
};
