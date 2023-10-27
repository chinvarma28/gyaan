const Book = require('../models/Book');
exports.allBooks = async (req, res, next) => {
    try {
        const allBooks = await Book.find({});
        return res.json(allBooks);
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.json(book);
    } catch (error) {
        next(error);
    }
}
