const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';

/**
 * Auth Service
 * Handles user registration and login business logic
 */

/**
 * Register a new user
 * @param {Object} data - { name, email, password }
 * @returns {Object} User object with JWT token
 */
const registerUser = async (data) => {
  const { name, email, password } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw {
      statusCode: 409,
      message: 'Email is already registered',
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user in database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

/**
 * Login user
 * @param {Object} data - { email, password }
 * @returns {Object} User object with JWT token
 */
const loginUser = async (data) => {
  const { email, password } = data;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw {
      statusCode: 401,
      message: 'Invalid email or password',
    };
  }

  // Compare password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw {
      statusCode: 401,
      message: 'Invalid email or password',
    };
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
