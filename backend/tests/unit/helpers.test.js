const { validateBugData, formatBugData } = require('../../utils/helpers');

describe('Helper Functions', () => {
  describe('validateBugData', () => {
    test('should validate complete bug data', () => {
      const bugData = {
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'open',
        severity: 'medium',
      };
      
      const result = validateBugData(bugData);
      expect(result.isValid).toBe(true);
    });

    test('should fail validation when title is missing', () => {
      const bugData = {
        description: 'This is a test bug',
        status: 'open',
      };
      
      const result = validateBugData(bugData);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Title is required');
    });

    test('should fail validation when description is missing', () => {
      const bugData = {
        title: 'Test Bug',
        status: 'open',
      };
      
      const result = validateBugData(bugData);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Description is required');
    });

    test('should fail validation when status is invalid', () => {
      const bugData = {
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'invalid-status',
      };
      
      const result = validateBugData(bugData);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Status must be one of: open, in-progress, resolved');
    });

    test('should allow partial updates', () => {
      const bugData = {
        status: 'in-progress',
      };
      
      const result = validateBugData(bugData, true);
      expect(result.isValid).toBe(true);
    });
  });

  describe('formatBugData', () => {
    test('should format bug data correctly', () => {
      const mockBug = {
        _id: '123456789',
        title: 'Test Bug',
        description: 'This is a test bug',
        status: 'open',
        severity: 'medium',
        assignedTo: 'John Doe',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-02T00:00:00.000Z',
      };
      
      const result = formatBugData(mockBug);
      
      expect(result).toHaveProperty('id', '123456789');
      expect(result).toHaveProperty('title', 'Test Bug');
      expect(result).toHaveProperty('status', 'open');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
  });
});