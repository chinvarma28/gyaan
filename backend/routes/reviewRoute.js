const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/reviews', reviewController.createReview);
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:bookId', reviewController.getReviewById);
router.delete('/reviews/:id', reviewController.deleteReview);
router.patch('/reviews/:id', reviewController.updateReview);

module.exports = router;
