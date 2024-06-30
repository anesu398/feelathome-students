const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerConfig');
const { addProperty, getProperties } = require('../controllers/propertyController');

router.post('/add', auth, upload, addProperty);
router.get('/', getProperties);

module.exports = router;
