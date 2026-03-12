/**
 * Dashboard Page
 * Main page showing tasks and task management
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { taskAPI } from '../services/api';
import { userAPI } from '../services/api';
import { logout, getUser } from '../utils/auth';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // Fetch user profile and tasks on component mount
  useEffect(() => {
    fetchUserProfile();
    fetchTasks();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      // If profile fetch fails, user might be unauthorized
      if (err.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      if (err.status === 401) {
        handleLogout();
      } else {
        setError(err.message || 'Failed to fetch tasks');
      }
      setIsLoadingTasks(false);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleCreateTask = async (title, description) => {
    try {
      setIsLoadingForm(true);
      const response = await taskAPI.createTask(title, description);
      setTasks((prev) => [response.data, ...prev]);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEditTask = async (taskId, title, description) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const response = await taskAPI.updateTask(
        taskId,
        title,
        description,
        task.completed
      );
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? response.data : t))
      );
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const response = await taskAPI.updateTask(
        taskId,
        task.title,
        task.description,
        !task.completed
      );
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? response.data : t))
      );
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Task Manager</h1>
          {user && <p className="welcome-message">Welcome, {user.name}!</p>}
        </div>
        <button onClick={handleLogout} className="btn btn-logout">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Error Alert */}
        {error && <div className="error-alert">{error}</div>}

        {/* Add Task Form */}
        <div className="task-form-section">
          <TaskForm onSubmit={handleCreateTask} isLoading={isLoadingForm} />
        </div>

        {/* Task Stats */}
        <div className="task-stats">
          <span>Total: {totalCount}</span>
          <span>Completed: {completedCount}</span>
          <span>Remaining: {totalCount - completedCount}</span>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          {isLoadingTasks ? (
            <div className="loading-message">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-message">
              No tasks yet. Create one using the form above!
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
