const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResponse } = require('../utils/helpers');
require('dotenv').config();

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return sendResponse(res, 401, 'No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return sendResponse(res, 404, 'User not found');
    }

    next();
  } catch (error) {
    sendResponse(res, 401, 'Token is not valid');
  }
};
