const paynow = require('../config/paynow');

exports.processPayment = async (bookingId, amount) => {
  const payment = paynow.createPayment(`Invoice ${bookingId}`, 'user@example.com');
  payment.add(`Booking ${bookingId}`, amount);

  try {
    const response = await paynow.send(payment);
    if (response.success) {
      return {
        status: 'Pending',
        paymentLink: response.redirectUrl,
        pollUrl: response.pollUrl
      };
    } else {
      throw new Error('Payment initiation failed');
    }
  } catch (err) {
    throw err;
  }
};
