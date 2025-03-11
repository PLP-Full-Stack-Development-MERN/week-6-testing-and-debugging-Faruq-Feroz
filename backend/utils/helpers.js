/**
 * Validates bug data for creation or update
 * @param {Object} data - Bug data to validate
 * @param {Boolean} isUpdate - Whether this is an update operation
 * @returns {Object} Validation result
 */
const validateBugData = (data, isUpdate = false) => {
    // For update operations, we don't need to validate all fields
    if (isUpdate) {
      // No validation needed for partial updates
      return { isValid: true };
    }
  
    // For creation, title and description are required
    if (!data.title || data.title.trim() === '') {
      return {
        isValid: false,
        error: 'Title is required',
      };
    }
  
    if (!data.description || data.description.trim() === '') {
      return {
        isValid: false,
        error: 'Description is required',
      };
    }
  
    // Validate status if provided
    if (data.status && !['open', 'in-progress', 'resolved'].includes(data.status)) {
      return {
        isValid: false,
        error: 'Status must be one of: open, in-progress, resolved',
      };
    }
  
    // Validate severity if provided
    if (data.severity && !['low', 'medium', 'high', 'critical'].includes(data.severity)) {
      return {
        isValid: false,
        error: 'Severity must be one of: low, medium, high, critical',
      };
    }
  
    return { isValid: true };
  };
  
  /**
   * Format bug data for display
   * @param {Object} bug - Bug data to format
   * @returns {Object} Formatted bug data
   */
  const formatBugData = (bug) => {
    return {
      id: bug._id,
      title: bug.title,
      description: bug.description,
      status: bug.status,
      severity: bug.severity,
      assignedTo: bug.assignedTo,
      createdAt: new Date(bug.createdAt).toLocaleString(),
      updatedAt: new Date(bug.updatedAt).toLocaleString(),
    };
  };
  
  module.exports = {
    validateBugData,
    formatBugData,
  };