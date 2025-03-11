const Bug = require('../models/Bug');
const { validateBugData } = require('../utils/helpers');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bugs' });
  }
};

// @desc    Create a new bug
// @route   POST /api/bugs
// @access  Public
const createBug = async (req, res) => {
  try {
    const { title, description, status, severity, assignedTo } = req.body;
    
    // Validate input data
    const { isValid, error } = validateBugData(req.body);
    if (!isValid) {
      return res.status(400).json({ message: error });
    }

    const bug = await Bug.create({
      title,
      description,
      status: status || 'open',
      severity: severity || 'medium',
      assignedTo: assignedTo || 'Unassigned',
    });

    res.status(201).json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a bug
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    // Validate update data
    const { isValid, error } = validateBugData(req.body, true);
    if (!isValid) {
      return res.status(400).json({ message: error });
    }

    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(updatedBug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    await Bug.deleteOne({ _id: req.params.id });

    res.json({ message: 'Bug deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
};
