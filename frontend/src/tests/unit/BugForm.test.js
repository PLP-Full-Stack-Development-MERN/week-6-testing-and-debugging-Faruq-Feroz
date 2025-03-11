import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../../components/BugForm';
import { createBug } from '../../services/bugService';

// Mock the bug service
jest.mock('../../services/bugService');

describe('BugForm Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test('renders the form elements correctly', () => {
    render(<BugForm addBug={() => {}} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/severity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assigned to/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit bug/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<BugForm addBug={() => {}} />);
    
    // Submit with empty fields
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));
    
    // Check for validation message
    expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument();
    
    // createBug should not be called
    expect(createBug).not.toHaveBeenCalled();
  });

  test('submits the form with valid data', async () => {
    const mockAddBug = jest.fn();
    const mockBug = {
      _id: '123',
      title: 'Test Bug',
      description: 'This is a test bug',
      severity: 'high',
      assignedTo: 'Tester',
      status: 'open'
    };
    
    // Mock successful bug creation
    createBug.mockResolvedValueOnce(mockBug);
    
    render(<BugForm addBug={mockAddBug} />);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Bug' }
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test bug' }
    });
    
    fireEvent.change(screen.getByLabelText(/severity/i), {
      target: { value: 'high' }
    });
    
    fireEvent.change(screen.getByLabelText(/assigned to/i), {
      target: { value: 'Tester' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));
    
    // Check if createBug was called with correct data
    expect(createBug).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'This is a test bug',
      severity: 'high',
      assignedTo: 'Tester'
    });
    
    // Wait for addBug to be called with the new bug
    await waitFor(() => {
      expect(mockAddBug).toHaveBeenCalledWith(mockBug);
    });
    
    // Form should be reset
    await waitFor(() => {
      expect(screen.getByLabelText(/title/i)).toHaveValue('');
      expect(screen.getByLabelText(/description/i)).toHaveValue('');
    });
  });

  test('handles API errors', async () => {
    // Mock API error
    createBug.mockRejectedValueOnce(new Error('API Error'));
    
    render(<BugForm addBug={() => {}} />);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Bug' }
    });
    
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Description' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to create bug/i)).toBeInTheDocument();
    });
  });
});