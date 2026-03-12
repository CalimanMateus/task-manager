/**
 * Authentication Utilities
 * Helper functions for authentication and token management
 */

/**
 * Store token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 * Get token from localStorage
 * @returns {string|null} JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('token');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Get user data from localStorage
 * @returns {object|null} User data or null
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Store user data in localStorage
 * @param {object} user - User object
 */
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
  localStorage.removeItem('user');
};

/**
 * Logout user (clear token and user data)
 */
export const logout = () => {
  removeToken();
  removeUser();
};
