const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

/**
 * Middleware
 */

// Parse incoming JSON requests
app.use(express.json());

// Handle URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

/**
 * Routes
 */

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// API routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

/**
 * Error handling middleware
 */

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

module.exports = app;
