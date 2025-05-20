const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

// POST /books - Add a book (auth required)
router.post('/', authMiddleware, async (req, res) => {
  const { title, author, isbn } = req.body;
  const book = new Book({ title, author, isbn });
  await book.save();
  res.status(201).json(book);
});

// GET /books - List all books with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default page 1
  const limit = parseInt(req.query.limit) || 10; // default 10 books per page
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /search - Search books by title or author (partial and case-insensitive)
router.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const regex = new RegExp(q, 'i'); // case-insensitive regex

    const books = await Book.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /books/:isbn - Book details
router.get('/:isbn', async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// POST /books/:isbn/reviews - Add review (auth required)
router.post('/:isbn/reviews', authMiddleware, async (req, res) => {
  const { content, rating } = req.body;
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ error: 'Book not found' });

  book.reviews.push({ user: req.userId, content, rating });
  await book.save();
  res.status(201).json({ message: 'Review added' });
});

// GET /books/:isbn/reviews - Get reviews
router.get('/:isbn/reviews', async (req, res) => {
  const book = await Book.findOne({ isbn: req.params.isbn });
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book.reviews);
});

// PUT /reviews/:id - Update your own review
router.put('/reviews/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;

  const book = await Book.findOne({ 'reviews._id': id });
  if (!book) return res.status(404).json({ error: 'Review not found' });

  const review = book.reviews.id(id);
  if (review.user.toString() !== req.userId) {
    return res.status(403).json({ error: 'You can only edit your own reviews' });
  }

  if (content !== undefined) review.content = content;
  if (rating !== undefined) review.rating = rating;

  await book.save();
  res.json({ message: 'Review updated' });
});

// DELETE /reviews/:id - Delete your own review
router.delete('/reviews/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  const book = await Book.findOne({ 'reviews._id': id });
  if (!book) return res.status(404).json({ error: 'Review not found' });

  const review = book.reviews.id(id);
  if (review.user.toString() !== req.userId) {
    return res.status(403).json({ error: 'You can only delete your own reviews' });
  }

book.reviews.pull(id);;  // delete reviews by review id inside arrays
await book.save();
  res.json({ message: 'Review deleted' });
});


module.exports = router;
