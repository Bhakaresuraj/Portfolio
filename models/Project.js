const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  techStack: {
    type: [String],
    required: [true, 'Tech stack is required'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one technology must be specified',
    },
  },
  projectLink: {
    type: String,
    trim: true,
  },
  githubLink: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Index for faster queries
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
