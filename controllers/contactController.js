const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
exports.createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Create contact in database
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email (non-blocking)
    sendContactEmail(contact).catch(err => {
      console.error('Email sending failed:', err);
      // Don't fail the request if email fails
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
