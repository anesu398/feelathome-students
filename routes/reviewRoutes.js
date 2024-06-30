const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addReview, getReviews } = require('../controllers/reviewController');

router.post('/add', auth, addReview);
router.get('/:propertyId', getReviews);

module.exports = router;
