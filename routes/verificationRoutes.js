const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { verifyUser } = require('../controllers/verificationController');

router.post('/verify', auth, verifyUser);

module.exports = router;
