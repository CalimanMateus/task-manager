const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Task Service
 * Handles task-related business logic
 */

/**
 * Create a new task
 * @param {Object} data - { title, description, userId }
 * @returns {Object} Created task
 */
const createTask = async (data) => {
  const { title, description, userId } = data;

  // Validate that user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw {
      statusCode: 404,
      message: 'User not found',
    };
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });

  return task;
};

/**
 * Get all tasks for a user
 * @param {string} userId - User ID
 * @returns {Array} Array of tasks
 */
const getUserTasks = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return tasks;
};

/**
 * Get a specific task by ID
 * @param {string} taskId - Task ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Task object
 */
const getTaskById = async (taskId, userId) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  // Check if task belongs to the authenticated user
  if (task.userId !== userId) {
    throw {
      statusCode: 403,
      message: 'Unauthorized: You can only access your own tasks',
    };
  }

  return task;
};

/**
 * Update a task
 * @param {string} taskId - Task ID
 * @param {Object} data - { title, description, completed }
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Updated task
 */
const updateTask = async (taskId, data, userId) => {
  // Verify task exists and belongs to user
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  if (task.userId !== userId) {
    throw {
      statusCode: 403,
      message: 'Unauthorized: You can only update your own tasks',
    };
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
  });

  return updatedTask;
};

/**
 * Delete a task
 * @param {string} taskId - Task ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Deleted task
 */
const deleteTask = async (taskId, userId) => {
  // Verify task exists and belongs to user
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  if (task.userId !== userId) {
    throw {
      statusCode: 403,
      message: 'Unauthorized: You can only delete your own tasks',
    };
  }

  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });

  return deletedTask;
};

/**
 * Mark a task as complete
 * @param {string} taskId - Task ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Updated task
 */
const completeTask = async (taskId, userId) => {
  // Verify task exists and belongs to user
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    throw {
      statusCode: 404,
      message: 'Task not found',
    };
  }

  if (task.userId !== userId) {
    throw {
      statusCode: 403,
      message: 'Unauthorized: You can only complete your own tasks',
    };
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { completed: true },
  });

  return updatedTask;
};

module.exports = {
  createTask,
  getUserTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask,
};
