const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define routes for reviews
router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:bookId', reviewController.getReviewById);
// Add more routes as needed

module.exports = router;
