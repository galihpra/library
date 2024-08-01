export const getAllUsers = (callback) => {
  const query = 'SELECT users.*, COUNT(loans.book_id) AS borrowed_books_quantity FROM users LEFT JOIN loans ON users.code = loans.user_id AND loans.tanggal_dikembalikan IS NULL GROUP BY users.code';
  global.db.query(query, (err, results) => {
    if (err) {
        return callback(err);
    }
    callback(null, results);
  });
};
