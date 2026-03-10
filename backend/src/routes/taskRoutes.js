const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * Task Routes
 * All routes are protected with JWT authentication
 */

// POST /tasks - Create a new task (protected route)
router.post('/', authenticateToken, taskController.createTask);

// GET /tasks - Get all tasks for authenticated user (protected route)
router.get('/', authenticateToken, taskController.getTasks);

// GET /tasks/:id - Get a specific task (protected route)
router.get('/:id', authenticateToken, taskController.getTaskById);

// PUT /tasks/:id - Update a task (protected route)
router.put('/:id', authenticateToken, taskController.updateTask);

// DELETE /tasks/:id - Delete a task (protected route)
router.delete('/:id', authenticateToken, taskController.deleteTask);

// PATCH /tasks/:id/complete - Mark a task as complete (protected route)
router.patch('/:id/complete', authenticateToken, taskController.completeTask);

module.exports = router;
