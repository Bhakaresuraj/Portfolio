const Profile = require('../models/Profile');

// @desc    Get profile data
// @route   GET /api/profile
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.getProfile();
    
    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
