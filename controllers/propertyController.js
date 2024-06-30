const Property = require('../models/Property');
const { sendResponse, handleError } = require('../utils/helpers');

exports.addProperty = async (req, res) => {
  const { title, description, price } = req.body;
  const owner = req.user.id;

  try {
    const property = new Property({
      title,
      description,
      price,
      images: req.files.map(file => file.path),
      owner,
    });

    await property.save();

    sendResponse(res, 201, 'Property added successfully', property);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'email role');
    sendResponse(res, 200, 'Properties fetched successfully', properties);
  } catch (error) {
    handleError(res, error);
  }
};
