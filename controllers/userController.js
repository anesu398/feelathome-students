const User = require('../models/User');
const { sendResponse, handleError } = require('../utils/helpers');

exports.getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }
    sendResponse(res, 200, 'User fetched successfully', user);
  } catch (error) {
    handleError(res, error);
  }
};
