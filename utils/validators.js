const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  check('role', 'Role is required').isIn(['student', 'landlord', 'agent']),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateProperty = [
  check('title', 'Title is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('price', 'Price must be a number').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateBooking = [
  check('propertyId', 'Property ID is required').notEmpty(),
  check('checkIn', 'Check-in date is required').isISO8601(),
  check('checkOut', 'Check-out date is required').isISO8601(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateReview = [
  check('propertyId', 'Property ID is required').notEmpty(),
  check('rating', 'Rating must be a number between 1 and 5').isInt({ min: 1, max: 5 }),
  check('comment', 'Comment is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.validateVerification = [
  check('nationalId', 'National ID is required').notEmpty(),
  check('studentId', 'Student ID is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
