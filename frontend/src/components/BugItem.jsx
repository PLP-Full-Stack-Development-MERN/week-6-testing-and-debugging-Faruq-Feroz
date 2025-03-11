import React, { useState } from 'react';
import { updateBugStatus, deleteBugById } from '../services/bugService';

const BugItem = ({ bug, updateBug, deleteBug }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle status change
  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      const updatedBug = await updateBugStatus(bug._id, newStatus);
      updateBug(updatedBug);
    } catch (err) {
      console.error('Error updating bug status:', err);
      setError('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to handle bug deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setIsDeleting(true);
      setError(null);
      
      try {
        await deleteBugById(bug._id);
        deleteBug(bug._id);
      } catch (err) {
        console.error('Error deleting bug:', err);
        setError('Failed to delete bug');
        setIsDeleting(false);
      }
    }
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-open';
      case 'in-progress':
        return 'status-in-progress';
      case 'resolved':
        return 'status-resolved';
      default:
        return '';
    }
  };

  // Get severity display
  const getSeverityDisplay = (severity) => {
    switch (severity) {
      case 'low':
        return '🟢 Low';
      case 'medium':
        return '🟡 Medium';
      case 'high':
        return '🟠 High';
      case 'critical':
        return '🔴 Critical';
      default:
        return severity;
    }
  };

  return (
    <div className="bug-item">
      {error && <div className="error-message">{error}</div>}
      
      <div className="bug-header">
        <h3 className="bug-title">{bug.title}</h3>
        <span className={`bug-status ${getStatusClass(bug.status)}`}>
          {bug.status}
        </span>
      </div>
      
      <p className="bug-description">{bug.description}</p>
      
      <div className="bug-details">
        <p>
          <strong>Severity:</strong> {getSeverityDisplay(bug.severity)}
        </p>
        <p>
          <strong>Assigned to:</strong> {bug.assignedTo || 'Unassigned'}
        </p>
        <p>
          <strong>Reported:</strong> {new Date(bug.createdAt).toLocaleString()}
        </p>
      </div>
      
      <div className="bug-actions">
        {bug.status !== 'open' && (
          <button
            onClick={() => handleStatusChange('open')}
            className="btn btn-warning"
            disabled={isUpdating}
          >
            Mark as Open
          </button>
        )}
        
        {bug.status !== 'in-progress' && (
          <button
            onClick={() => handleStatusChange('in-progress')}
            className="btn btn-warning"
            disabled={isUpdating}
          >
            Mark as In Progress
          </button>
        )}
        
        {bug.status !== 'resolved' && (
          <button
            onClick={() => handleStatusChange('resolved')}
            className="btn btn-success"
            disabled={isUpdating}
          >
            Mark as Resolved
          </button>
        )}
        
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default BugItem;