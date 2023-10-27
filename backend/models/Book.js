const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
