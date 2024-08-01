import { borrowBook, returnBook } from '../models/loanModel.js';

export const borrowBookController = (req, res) => {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
        return res.status(400).json({ message: 'User ID and Book ID are required' });
    }
    borrowBook(user_id, book_id, (err) => {
        if (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).json({ message: err.message });
            } else {
                return res.status(500).json({ message: 'Error borrowing book', error: err.message });
            }
        }
        res.status(200).json({ message: 'Book borrowed successfully' });
    });
};

export const returnBookController = (req, res) => {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
        return res.status(400).json({ message: 'User ID and Book ID are required' });
    }

    returnBook(user_id, book_id, (err, result) => {
        if (err) {
            if (err.statusCode) {
                return res.status(err.statusCode).json({ message: err.message });
            } else {
                return res.status(500).json({ message: 'Error returning book', error: err.message });
            }
        }
        res.status(200).json(result);
    });
};