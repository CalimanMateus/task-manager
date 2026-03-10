const taskService = require('../services/taskService');

/**
 * Task Controller
 * Handles HTTP requests for task operations
 */

/**
 * Create a new task
 * POST /tasks
 * @param {Object} req - Request object with body { title, description }
 * @param {Object} res - Response object
 */
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const task = await taskService.createTask({
      title,
      description,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
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
    console.error('Create task error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get all tasks for the authenticated user
 * GET /tasks
 * @param {Object} req - Request object with user data from JWT
 * @param {Object} res - Response object
 */
const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await taskService.getUserTasks(userId);

    return res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Get tasks error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Get a specific task by ID
 * GET /tasks/:id
 * @param {Object} req - Request object with params { id }
 * @param {Object} res - Response object
 */
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await taskService.getTaskById(id, userId);

    return res.status(200).json({
      success: true,
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error) {
    // Handle not found errors
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // Handle authorization errors
    if (error.statusCode === 403) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Get task error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Update a task
 * PUT /tasks/:id
 * @param {Object} req - Request object with params { id } and body { title, description, completed }
 * @param {Object} res - Response object
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, completed } = req.body;

    // Validate that at least one field is provided
    if (title === undefined && description === undefined && completed === undefined) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (title, description, or completed) must be provided',
      });
    }

    // Build update data object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    const task = await taskService.updateTask(id, updateData, userId);

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    // Handle not found errors
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // Handle authorization errors
    if (error.statusCode === 403) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Update task error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Delete a task
 * DELETE /tasks/:id
 * @param {Object} req - Request object with params { id }
 * @param {Object} res - Response object
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await taskService.deleteTask(id, userId);

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  } catch (error) {
    // Handle not found errors
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // Handle authorization errors
    if (error.statusCode === 403) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Delete task error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Mark a task as complete
 * PATCH /tasks/:id/complete
 * @param {Object} req - Request object with params { id }
 * @param {Object} res - Response object
 */
const completeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await taskService.completeTask(id, userId);

    return res.status(200).json({
      success: true,
      message: 'Task marked as complete',
      data: task,
    });
  } catch (error) {
    // Handle not found errors
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // Handle authorization errors
    if (error.statusCode === 403) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    // Handle unexpected errors
    console.error('Complete task error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};
