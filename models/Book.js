const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: {type: String, unique: true},
    reviews: [
        {
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            content: String,
            rating: Number
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);