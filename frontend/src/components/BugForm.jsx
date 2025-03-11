import React, { useState } from 'react';
import { createBug } from '../services/bugService';

const BugForm = ({ addBug }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    assignedTo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { title, description, severity, assignedTo } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Simple form validation
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newBug = await createBug(formData);
      addBug(newBug);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        severity: 'medium',
        assignedTo: ''
      });
    } catch (err) {
      console.error('Error creating bug:', err);
      setError('Failed to create bug. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bug-form">
      <h2>Report a Bug</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label" data-required="*">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Brief description of the bug"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label" data-required="*">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Detailed explanation of the bug"
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="severity" className="form-label">Severity</label>
            <select
              id="severity"
              name="severity"
              value={severity}
              onChange={onChange}
              className="form-control"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo" className="form-label">Assigned To</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={assignedTo}
              onChange={onChange}
              placeholder="Leave blank if unassigned"
              className="form-control"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Bug'}
        </button>
      </form>
    </div>
  );
};

export default BugForm;