const Review = require('../models/Review');
const { sendResponse, handleError } = require('../utils/helpers');

exports.addReview = async (req, res) => {
  const { propertyId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const review = new Review({
      propertyId,
      userId,
      rating,
      comment,
    });

    await review.save();

    sendResponse(res, 201, 'Review added successfully', review);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getReviews = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const reviews = await Review.find({ propertyId }).populate('userId', 'email role');
    sendResponse(res, 200, 'Reviews fetched successfully', reviews);
  } catch (error) {
    handleError(res, error);
  }
};
