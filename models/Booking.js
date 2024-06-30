const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', BookingSchema);
