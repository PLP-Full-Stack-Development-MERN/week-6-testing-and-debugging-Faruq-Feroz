const mongoose = require('mongoose');

const bugSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'in-progress', 'resolved'],
      default: 'open',
    },
    severity: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    assignedTo: {
      type: String,
      default: 'Unassigned',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bug', bugSchema);