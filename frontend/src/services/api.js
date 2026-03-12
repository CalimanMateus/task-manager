/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Helper function to make API requests
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if it exists
  const token = localStorage.getItem('token');
  
  // Set up default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add authorization token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Parse response
    const data = await response.json();
    
    // Check for errors
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'API Error',
      };
    }
    
    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      throw {
        status: 0,
        message: 'Network error. Is the server running?',
      };
    }
    throw error;
  }
}

/**
 * Auth API calls
 */
export const authAPI = {
  register: (name, email, password) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

/**
 * User API calls
 */
export const userAPI = {
  getProfile: () => apiCall('/users/profile'),
};

/**
 * Task API calls
 */
export const taskAPI = {
  getTasks: () => apiCall('/tasks'),

  getTask: (id) => apiCall(`/tasks/${id}`),

  createTask: (title, description) =>
    apiCall('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),

  updateTask: (id, title, description, completed) =>
    apiCall(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, completed }),
    }),

  deleteTask: (id) =>
    apiCall(`/tasks/${id}`, {
      method: 'DELETE',
    }),

  completeTask: (id) =>
    apiCall(`/tasks/${id}/complete`, {
      method: 'PATCH',
    }),
};
