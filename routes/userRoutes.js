const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getUser } = require('../controllers/userController');

router.get('/', auth, getUser);

module.exports = router;
