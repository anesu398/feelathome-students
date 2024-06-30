const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Hashes a password using bcrypt
 * @param {string} password - The plain text password
 * @returns {Promise<string>} - The hashed password
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a plain text password with a hashed password
 * @param {string} password - The plain text password
 * @param {string} hashedPassword - The hashed password
 * @returns {Promise<boolean>} - Whether the passwords match
 */
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JWT token
 * @param {object} payload - The payload to encode in the token
 * @returns {string} - The JWT token
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Verifies a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {object|null} - The decoded payload or null if verification fails
 */
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Sends a formatted error response
 * @param {object} res - The response object
 * @param {number} statusCode - The HTTP status code
 * @param {string} message - The error message
 */
exports.sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

/**
 * Sends a formatted success response
 * @param {object} res - The response object
 * @param {number} statusCode - The HTTP status code
 * @param {object} data - The data to send in the response
 */
exports.sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};
