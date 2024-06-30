const User = require('../models/User');
const { generateToken, hashPassword, comparePassword, sendResponse, handleError } = require('../utils/helpers');

exports.register = async (req, res) => {
  const { email, password, role, nationalId, studentId } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return sendResponse(res, 400, 'User already exists');
    }

    user = new User({
      email,
      password: await hashPassword(password),
      role,
      nationalId,
      studentId,
    });

    await user.save();

    const token = generateToken(user);

    sendResponse(res, 201, 'User registered successfully', { token });
  } catch (error) {
    handleError(res, error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, 'Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 400, 'Invalid credentials');
    }

    const token = generateToken(user);

    sendResponse(res, 200, 'User logged in successfully', { token });
  } catch (error) {
    handleError(res, error);
  }
};
