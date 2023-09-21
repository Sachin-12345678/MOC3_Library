const Book = require('../models/book');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      price,
      quantity,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { title, author, category, price, quantity } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      category,
      price,
      quantity,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(202).json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
