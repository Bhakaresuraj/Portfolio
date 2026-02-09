const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController');
const { contactValidationRules, validate } = require('../utils/validators');

router.post('/', contactValidationRules, validate, createContact);

module.exports = router;
