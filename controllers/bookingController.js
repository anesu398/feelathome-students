const Booking = require('../models/Booking');
const Property = require('../models/Property');
const { formatDate, isDateInPast, sendResponse, handleError } = require('../utils/helpers');

//courtesy of Rodent Inc & Anesu Prince Ndava//

exports.bookProperty = async (req, res) => {
  const { propertyId, checkIn, checkOut, totalAmount } = req.body;
  const userId = req.user.id;

  if (isDateInPast(checkIn) || isDateInPast(checkOut)) {
    return sendResponse(res, 400, 'Check-in and check-out dates must be in the future');
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return sendResponse(res, 404, 'Property not found');
    }
//courtesy of Rodent Inc & Anesu Prince Ndava//
    const booking = new Booking({
      propertyId,
      userId,
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
      totalAmount,
    });

    await booking.save();

    sendResponse(res, 201, 'Property booked successfully', booking);
  } catch (error) {
    handleError(res, error);
  }
};
