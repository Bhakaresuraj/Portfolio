const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    trim: true,
  },
  proficiencyLevel: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: 1,
    max: 100,
  },
}, {
  timestamps: true,
});

// Index for faster queries
skillSchema.index({ category: 1 });

module.exports = mongoose.model('Skill', skillSchema);
