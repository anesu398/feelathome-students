const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationalId: { type: String },
  studentId: { type: String },
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
