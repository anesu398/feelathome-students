const Paynow = require('paynow');
require('dotenv').config();

const paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
);

module.exports = paynow;
