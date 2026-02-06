const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
  },
  socialLinks: {
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
}, {
  timestamps: true,
});

// Ensure only one profile document exists
profileSchema.statics.getProfile = async function() {
  let profile = await this.findOne();
  if (!profile) {
    profile = await this.create({
      name: 'Your Name',
      title: 'Full Stack Developer',
      bio: 'A passionate developer...',
      socialLinks: {}
    });
  }
  return profile;
};

module.exports = mongoose.model('Profile', profileSchema);
