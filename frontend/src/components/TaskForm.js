/**
 * TaskForm Component
 * Form for creating new tasks
 */

import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate input
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      await onSubmit(title, description);
      // Clear form on success
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to create task');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="form-input"
          disabled={isLoading}
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description (optional)"
          className="form-textarea"
          disabled={isLoading}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
