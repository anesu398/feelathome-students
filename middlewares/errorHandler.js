const { sendResponse } = require('../utils/helpers');

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  sendResponse(res, 500, 'Server Error', { error: err.message });
};
