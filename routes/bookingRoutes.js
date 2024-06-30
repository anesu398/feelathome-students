const express = require('express');
const { bookProperty } = require('../controllers/bookingController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/book', authenticateJWT, bookProperty);

module.exports = router;
