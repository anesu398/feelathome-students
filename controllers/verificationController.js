const User = require('../models/User');
const { sendResponse, handleError } = require('../utils/helpers');

exports.verifyUser = async (req, res) => {
  const userId = req.user.id;
  const { nationalId, studentId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    user.nationalId = nationalId;
    user.studentId = studentId;
    user.verified = true;

    await user.save();

    sendResponse(res, 200, 'User verified successfully', user);
  } catch (error) {
    handleError(res, error);
  }
};
