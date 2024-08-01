import { getAllBooks } from '../models/bookModel.js';

export const getAllBooksController = (req, res) => {
  getAllBooks((err, books) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving books', error: err.message });
    }
    
    res.status(200).json({
      message: 'success get all books',
      data: books
    });
  });
};