/**
 * TaskItem Component
 * Displays a single task with edit and delete options
 */

import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            className="edit-input"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description (optional)"
            className="edit-textarea"
          />
          <div className="edit-buttons">
            <button onClick={handleEdit} className="btn btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleComplete}
          className="task-checkbox"
        />
        <div className="task-text">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
