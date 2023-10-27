const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', 
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
