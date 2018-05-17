const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookModel = new Schema({
    title: String,
    author: String
});
module.exports = mongoose.model('books', bookModel)