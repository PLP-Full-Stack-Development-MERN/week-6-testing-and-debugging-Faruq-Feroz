import axios from 'axios';

// API URL
const API_URL = 'http://localhost:5000/api/bugs';

// Fetch all bugs
export const fetchBugs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bugs:', error);
    throw error;
  }
};

// Create a new bug
export const createBug = async (bugData) => {
  try {
    const response = await axios.post(API_URL, bugData);
    return response.data;
  } catch (error) {
    console.error('Error creating bug:', error);
    throw error;
  }
};

// Update a bug's status
export const updateBugStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating bug status:', error);
    throw error;
  }
};

// Update a bug
export const updateBug = async (id, bugData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bugData);
    return response.data;
  } catch (error) {
    console.error('Error updating bug:', error);
    throw error;
  }
};

// Delete a bug
export const deleteBugById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bug:', error);
    throw error;
  }
};
