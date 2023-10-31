const Review = require('../models/Review');
const Book = require('../models/Book');
// Controller to create a new review
exports.createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        const reviews = await Review.find({
            bookId: req.body.bookId
        });

        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        await Book.findByIdAndUpdate(req.body.bookId, {
            rating: averageRating
        });
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

// Controller to get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

// Controller to get a review by ID
exports.getReviewById = async (req, res) => {
    const { bookId } = req.params;
    try {
      const reviews = await Review.find({
          bookId
      }).populate('userId', 'username');
        return res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json(review);
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}
