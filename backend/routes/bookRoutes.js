const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/all-books', bookController.allBooks);
router.get('/all-books/:id', bookController.getBookById);


module.exports = router;
