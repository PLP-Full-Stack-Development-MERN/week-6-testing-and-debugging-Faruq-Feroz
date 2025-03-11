import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest'; // Use Vitest instead of Jest
import BugItem from '../../components/BugItem';
import { updateBugStatus, deleteBugById } from '../../services/bugService';

// Mock the bug service
vi.mock('../../services/bugService');

describe('BugItem Component', () => {
  const mockBug = {
    _id: '123',
    title: 'Test Bug',
    description: 'This is a test bug',
    severity: 'high',
    status: 'open',
    assignedTo: 'Tester',
    createdAt: new Date().toISOString()
  };

  const mockUpdateBug = vi.fn();
  const mockDeleteBug = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks(); // Reset mocks before each test
    window.confirm = vi.fn(() => true); // Mock confirm dialog to always return true
  });

  test('renders bug details correctly', () => {
    render(
      <BugItem 
        bug={mockBug} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('This is a test bug')).toBeInTheDocument();
    expect(screen.getByText(/high/i)).toBeInTheDocument();
    expect(screen.getByText('Tester')).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();
  });

  test('shows status update buttons based on current status', () => {
    render(
      <BugItem 
        bug={mockBug} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    // For 'open' status, should show 'In Progress' and 'Resolved' buttons
    expect(screen.queryByText(/mark as open/i)).not.toBeInTheDocument();
    expect(screen.getByText(/mark as in progress/i)).toBeInTheDocument();
    expect(screen.getByText(/mark as resolved/i)).toBeInTheDocument();

    // Render with different status
    render(
      <BugItem 
        bug={{ ...mockBug, status: 'in-progress' }} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    // For 'in-progress' status, should show 'Open' and 'Resolved' buttons
    expect(screen.getByText(/mark as open/i)).toBeInTheDocument();
    expect(screen.queryByText(/mark as in progress/i)).not.toBeInTheDocument();
    expect(screen.getByText(/mark as resolved/i)).toBeInTheDocument();
  });

  test('changes bug status when status button is clicked', async () => {
    updateBugStatus.mockResolvedValueOnce({
      ...mockBug,
      status: 'in-progress'
    });

    render(
      <BugItem 
        bug={mockBug} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    // Click the 'Mark as In Progress' button
    fireEvent.click(screen.getByText(/mark as in progress/i));

    // Check if service function was called with correct params
    expect(updateBugStatus).toHaveBeenCalledWith('123', 'in-progress');

    // Wait for updateBug to be called with updated bug
    await waitFor(() => {
      expect(mockUpdateBug).toHaveBeenCalledWith(expect.objectContaining({
        _id: '123',
        status: 'in-progress'
      }));
    });
  });

  test('deletes bug when delete button is clicked', async () => {
    deleteBugById.mockResolvedValueOnce({ id: '123' });

    render(
      <BugItem 
        bug={mockBug} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    // Click the delete button
    fireEvent.click(screen.getByText(/delete/i));

    // Check if confirm was called
    expect(window.confirm).toHaveBeenCalled();

    // Check if service function was called with correct id
    expect(deleteBugById).toHaveBeenCalledWith('123');

    // Wait for deleteBug to be called with bug id
    await waitFor(() => {
      expect(mockDeleteBug).toHaveBeenCalledWith('123');
    });
  });

  test('handles status update error', async () => {
    // Mock API error
    updateBugStatus.mockRejectedValueOnce(new Error('API Error'));

    render(
      <BugItem 
        bug={mockBug} 
        updateBug={mockUpdateBug} 
        deleteBug={mockDeleteBug} 
      />
    );

    // Click the 'Mark as In Progress' button
    fireEvent.click(screen.getByText(/mark as in progress/i));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to update status/i)).toBeInTheDocument();
    });

    // updateBug should not have been called
    expect(mockUpdateBug).not.toHaveBeenCalled();
  });
});
