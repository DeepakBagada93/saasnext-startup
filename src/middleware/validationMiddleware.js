
const { body, validationResult } = require('express-validator');

// Validation Middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Auth Validations
const validateSignup = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateRequest
];

const validateLogin = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest
];

// Generation Validation
const validateGeneration = [
    body('prompt').notEmpty().withMessage('Prompt cannot be empty'),
    validateRequest
];

module.exports = {
    validateSignup,
    validateLogin,
    validateGeneration
};
